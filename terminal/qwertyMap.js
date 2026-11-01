const qwertyMap = new Map()
qwertyMap.set("'", {x: -1, y: 0});
qwertyMap.set("1", {x: 0, y: 0}); qwertyMap.set("!", {x: 0, y: -1});
qwertyMap.set("2", {x: 1, y: 0}); qwertyMap.set('"', {x: 1, y: -1});
qwertyMap.set("3", {x: 2, y: 0}); qwertyMap.set("#", {x: 2, y: -1});
qwertyMap.set("4", {x: 3, y: 0}); qwertyMap.set("$", {x: 3, y: -1});
qwertyMap.set("5", {x: 4, y: 0}); qwertyMap.set("%", {x: 4, y: -1});
qwertyMap.set("6", {x: 5, y: 0}); qwertyMap.set("&", {x: 5, y: -1});
qwertyMap.set("7", {x: 6, y: 0}); qwertyMap.set("/", {x: 6, y: -1}); qwertyMap.set('\\', {x: 6, y: -2}); qwertyMap.set('|', {x: 6, y: -3});
qwertyMap.set("8", {x: 7, y: 0}); qwertyMap.set("(", {x: 7, y: -1}); qwertyMap.set("[", {x: 7, y: -2}); qwertyMap.set("{", {x: 7, y: -3});
qwertyMap.set("9", {x: 8, y: 0}); qwertyMap.set(")", {x: 8, y: -1}); qwertyMap.set("]", {x: 8, y: -2}); qwertyMap.set("}", {x: 8, y: -3});
qwertyMap.set("0", {x: 9, y: 0}); qwertyMap.set("=", {x: 9, y: -1});
qwertyMap.set("+", {x: 10, y: 0}); qwertyMap.set("?", {x: 10, y: -1});

qwertyMap.set("q", {x: 0.5, y: 1});
qwertyMap.set("w", {x: 1.5, y: 1});
qwertyMap.set("e", {x: 2.5, y: 1});
qwertyMap.set("r", {x: 3.5, y: 1});
qwertyMap.set("t", {x: 4.5, y: 1});
qwertyMap.set("y", {x: 5.5, y: 1});
qwertyMap.set("u", {x: 6.5, y: 1});
qwertyMap.set("i", {x: 7.5, y: 1});
qwertyMap.set("o", {x: 8.5, y: 1});
qwertyMap.set("p", {x: 9.5, y: 1}); qwertyMap.set("π", {x: 9.5, y: 1});
qwertyMap.set("å", {x: 10.5, y: 1});
qwertyMap.set("^", {x: 11.5, y: 1}); qwertyMap.set("~", {x: 12.5, y: 1});

qwertyMap.set("a", {x: 0.5, y: 2});
qwertyMap.set("s", {x: 1.5, y: 2});
qwertyMap.set("d", {x: 2.5, y: 2});
qwertyMap.set("f", {x: 3.5, y: 2});
qwertyMap.set("g", {x: 4.5, y: 2});
qwertyMap.set("h", {x: 5.5, y: 2});
qwertyMap.set("j", {x: 6.5, y: 2});
qwertyMap.set("k", {x: 7.5, y: 2});
qwertyMap.set("l", {x: 8.5, y: 2});
qwertyMap.set("ø", {x: 9.5, y: 2});
qwertyMap.set("æ", {x: 10.5, y: 2});
qwertyMap.set("@", {x: 11.5, y: 2}); qwertyMap.set("*", {x: 12.5, y: 2});

qwertyMap.set("<", {x: 0, y: 3}); qwertyMap.set(">", {x: 0, y: 4});
qwertyMap.set("z", {x: 1, y: 3});
qwertyMap.set("x", {x: 2, y: 3});
qwertyMap.set("c", {x: 3, y: 3});
qwertyMap.set("v", {x: 4, y: 3});
qwertyMap.set("b", {x: 5, y: 3});
qwertyMap.set("n", {x: 6, y: 3});
qwertyMap.set("m", {x: 7, y: 3});
qwertyMap.set(",", {x: 8, y: 3}); qwertyMap.set(";", {x: 8, y: 4});
qwertyMap.set(".", {x: 9, y: 3}); qwertyMap.set(":", {x: 9, y: 4});
qwertyMap.set("-", {x: 10, y: 3}); qwertyMap.set("_", {x: 10, y: 4});

qwertyMap.set(" ", {x: 5, y: 4});
qwertyMap.set("fallback", {x: 5, y: 2})