#!/bin/bash

# Skrypt scalający pliki śledzone przez git do jednego pliku txt w ./tmp
# Ignoruje pliki ignorowane przez git
# Parametry: base_folder (domyślnie .), filter (domyślnie *)

base_folder="${1:-.}"
filter="${2:-*}"

OUTPUT_DIR="./tmp"
OUTPUT_FILE="$OUTPUT_DIR/merged.txt"

# Utwórz katalog tmp jeśli nie istnieje
mkdir -p "$OUTPUT_DIR"

# Wyczyść plik wyjściowy jeśli istnieje
> "$OUTPUT_FILE"

# Pobierz listę plików śledzonych przez git i filtruj
git ls-files "$base_folder" | while IFS= read -r file; do
    # Sprawdź czy plik pasuje do filtru (obsługuje proste globy)
    if [[ $file == $filter ]] || [[ $filter == "*" ]]; then
        # Sprawdź czy plik istnieje
        if [ -f "$file" ]; then
            # Dodaj header
            echo "=========== $file ===========" >> "$OUTPUT_FILE"
            # Dodaj treść pliku
            cat "$file" >> "$OUTPUT_FILE"
            echo "" >> "$OUTPUT_FILE"
            echo "=================================" >> "$OUTPUT_FILE"
            echo "" >> "$OUTPUT_FILE"
        fi
    fi
done

echo "Scalanie zakończone. Plik zapisany w $OUTPUT_FILE"
