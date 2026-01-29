#!/usr/bin/env python3
"""
Script de escaneo de secretos (Módulo 12 - Vulnerability Scanning).
Busca patrones de credenciales hardcodeadas en el código.
Uso: python scripts/check_secrets.py [--path src/]
"""
import argparse
import re
import sys
from pathlib import Path

# Patrones comunes de secretos (no incluir valores reales en logs)
PATTERNS = [
    (
        "API_KEY",
        re.compile(
            r"(?:api[_-]?key|apikey)\s*[:=]\s*['\"][^'\"]+['\"]",
            re.IGNORECASE,
        ),
        "HIGH",
    ),
    (
        "PASSWORD",
        re.compile(
            r"password\s*[:=]\s*['\"][^'\"]+['\"]",
            re.IGNORECASE,
        ),
        "HIGH",
    ),
    (
        "SECRET",
        re.compile(
            r"(?:secret[_-]?key|secret_key)\s*[:=]\s*['\"][^'\"]+['\"]",
            re.IGNORECASE,
        ),
        "HIGH",
    ),
    (
        "TOKEN",
        re.compile(
            r"(?:token|bearer)\s*[:=]\s*['\"][^'\"]+['\"]",
            re.IGNORECASE,
        ),
        "HIGH",
    ),
    (
        "JWT_SECRET",
        re.compile(
            r"jwt[_-]?secret\s*[:=]\s*['\"][^'\"]+['\"]",
            re.IGNORECASE,
        ),
        "HIGH",
    ),
    (
        "DATABASE_URL",
        re.compile(
            r"database[_-]?url\s*[:=]\s*['\"][^'\"]*://[^'\"]+['\"]",
            re.IGNORECASE,
        ),
        "MEDIUM",
    ),
]

# Archivos/carpetas a ignorar
IGNORE_DIRS = {"__pycache__", ".git", "node_modules", "venv", ".venv", "dist", "build"}
IGNORE_EXT = {".pyc", ".pyo", ".min.js", ".min.css"}


def get_code_files(root: Path, exts: set[str]) -> list[Path]:
    """Recorre el árbol y devuelve archivos con extensiones dadas."""
    files = []
    for path in root.rglob("*"):
        if not path.is_file():
            continue
        if any(part in IGNORE_DIRS for part in path.parts):
            continue
        if path.suffix.lower() in IGNORE_EXT:
            continue
        if path.suffix.lower() in exts:
            files.append(path)
    return files


def scan_file(filepath: Path, root: Path) -> list[dict]:
    """Escanea un archivo en busca de patrones de secretos."""
    findings = []
    try:
        content = filepath.read_text(encoding="utf-8", errors="ignore")
    except OSError:
        return findings

    rel_path = filepath.relative_to(root) if root != filepath else filepath

    for name, pattern, severity in PATTERNS:
        for match in pattern.finditer(content):
            line_num = content[: match.start()].count("\n") + 1
            # No exponer el valor en la salida
            findings.append(
                {
                    "type": "HARDCODED_SECRET",
                    "name": name,
                    "severity": severity,
                    "file": str(rel_path),
                    "line": line_num,
                    "description": f"Posible {name} hardcodeado",
                    "recommendation": "Usar variables de entorno o gestor de secretos",
                }
            )

    return findings


def main() -> int:
    parser = argparse.ArgumentParser(description="Escaneo de secretos en el código (Módulo 12)")
    parser.add_argument(
        "--path",
        type=Path,
        default=Path(__file__).resolve().parent.parent / "src",
        help="Directorio a escanear (default: backend/src)",
    )
    parser.add_argument(
        "--ext",
        default=".py,.ts,.tsx,.js,.jsx,.json",
        help="Extensiones separadas por coma (default: .py,.ts,.tsx,.js,.jsx,.json)",
    )
    args = parser.parse_args()

    root = args.path.resolve()
    if not root.exists():
        print(f"Error: no existe el directorio {root}", file=sys.stderr)
        return 2

    exts = {"." + e.strip().lstrip(".") for e in args.ext.split(",")}
    files = get_code_files(root, exts)

    all_findings: list[dict] = []
    for f in files:
        all_findings.extend(scan_file(f, root))

    if not all_findings:
        print("OK: No se encontraron patrones de secretos hardcodeados.")
        return 0

    print(f"Se encontraron {len(all_findings)} posible(s) secreto(s) hardcodeado(s):\n")
    for f in all_findings:
        print(f"  [{f['severity']}] {f['file']}:{f['line']} - {f['name']}")
        print(f"    {f['description']}")
        print(f"    Recomendación: {f['recommendation']}\n")

    return 1


if __name__ == "__main__":
    sys.exit(main())
