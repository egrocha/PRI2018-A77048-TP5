BEGIN { 
	FS="\""; 
	id = "";
	titulo = "";
    print("{\n\"ficheiros\": {\n");
}

/"_id"/ { id = $4; }
/"titulo"/ { titulo = $4; }
/"tipo"/ { ficheiros[$4][id] = titulo; }

END {
	for (f in ficheiros) {
		print("\"" f "\": [");
		for (id in ficheiros[f]) {
			print("{\"_id\": \"" id "\", \"titulo\": \"" ficheiros[f][id] "\"},");
		}
		print("],\n");
	}
	print("}\n}");
} 