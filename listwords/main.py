
swears = []

with open('./swears.txt', 'r', encoding='utf-8') as f:
    for line in f:
        line = line.strip()
        if line:
            swears.append(line)

with open('../src/swears.txt', 'w', encoding='utf-8') as f:
    for swear in swears:
        if len(swear) == 5:
            f.write(swear + ' ')