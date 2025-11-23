#!/bin/bash

# Skrypt odwrotny do merge_files.sh - rozdziela scalony plik na poszczególne pliki
# Parametry: base_folder (domyślnie .), input_file (domyślnie ./tmp/merged.txt), filter (opcjonalny, np. *.ts)

base_folder="${1:-.}"
input_file="${2:-./tmp/merged.txt}"
filter="${3}"

if [ ! -f "$input_file" ]; then
    echo "Plik $input_file nie istnieje."
    exit 1
fi

current_file=""

while IFS= read -r line; do
    if echo "$line" | grep -q '^=========== .\+ ===========$'; then
        # Zamknij poprzedni plik jeśli otwarty
        if [ -n "$current_file" ]; then
            exec 3>&-
        fi
        file_path=$(echo "$line" | sed 's/^=========== \(.*\) ===========$/\1/')
        # Jeśli filter podany, sprawdź czy ścieżka pasuje do filtru (prosty glob match)
        if [ -n "$filter" ]; then
            if ! [[ "$file_path" == $filter ]]; then
                current_file=""
                continue
            fi
        fi
        current_file="$base_folder/$file_path"
        # Utwórz katalog jeśli nie istnieje
        mkdir -p "$(dirname "$current_file")"
        # Otwórz plik do zapisu
        exec 3> "$current_file"
    elif [[ $line == "=================================" ]]; then
        # Separator, ignoruj
        continue
    else
        # Treść, zapisz do pliku jeśli nie pusta
        if [ -n "$current_file" ] && [ -n "$line" ]; then
            echo "$line" >&3
        fi
    fi
done < "$input_file"

# Zamknij ostatni plik
if [ -n "$current_file" ]; then
    exec 3>&-
fi

echo "Rozdzielanie zakończone. Pliki zostały odtworzone w $base_folder."
