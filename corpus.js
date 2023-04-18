function example1(){
	processFileContent(`{
		"chars" : [
			{"char":"人","pinyin":"rén","eng":"people"},
			{"char":"生","pinyin":"shēng","eng":"life"},
			{"char":"而","pinyin":"ér","eng":"and"},
			{"char":"自","pinyin":"zì","eng":"self"},
			{"char":"由","pinyin":"yóu","eng":"depend"},
			{"char":",","pinyin":",","eng":","},
			{"char":"在","pinyin":"zài","eng":"at"},
			{"char":"尊","pinyin":"zūn","eng":"respect"},
			{"char":"嚴","pinyin":"yán","eng":"strict"},
			{"char":"和","pinyin":"hé","eng":"and"},
			{"char":"權","pinyin":"quán","eng":["might","power"]},
			{"char":"利","pinyin":"lì","eng":"profit"},
			{"char":"上","pinyin":"shàng","eng":"above"},
			{"char":"一","pinyin":"yī","eng":"one"},
			{"char":"律","pinyin":"lǜ","eng":"law"},
			{"char":"平","pinyin":"píng","eng":"flat"},
			{"char":"等","pinyin":"děng","eng":"level"},
			{"char":"。","pinyin":".","eng":"."},
			{"char":"他","pinyin":"tā","eng":"3"},
			{"char":"們","pinyin":"men","eng":"PL"},
			{"char":"賦","pinyin":"fù","eng":"give"},
			{"char":"有","pinyin":"yǒu","eng":"have"},
			{"char":"理","pinyin":"lǐ","eng":"reason"},
			{"char":"性","pinyin":"xìng","eng":"ness"},
			{"char":"良","pinyin":"liáng","eng":"good"},
			{"char":"心","pinyin":"xīn","eng":"heart"},
			{"char":"並","pinyin":"bìng","eng":"and"},
			{"char":"應","pinyin":"yīng","eng":"should"},
			{"char":"以","pinyin":"yǐ","eng":"by"},
			{"char":"兄","pinyin":"xiōng","eng":"elder brother"},
			{"char":"弟","pinyin":"dì","eng":"younger brother"},
			{"char":"關","pinyin":"guān","eng":"close"},
			{"char":"係","pinyin":"xì","eng":"relation"},
			{"char":"的","pinyin":"de","eng":"GEN"},
			{"char":"精","pinyin":"jīng","eng":"spirit"},
			{"char":"神","pinyin":"shén","eng":"god"},
			{"char":"相","pinyin":"xiāng","eng":"mutually"},
			{"char":"對","pinyin":"duì","eng":"right"},
			{"char":"待","pinyin":"dài","eng":"treat"}
		],
		"lexicon" : [
			{"chars": {"d":"chars","i":[0,0]},"gloss":"all people"},
			{"chars": {"d":"chars","i":[1]},"gloss":"born"},
			{"chars": {"d":"chars","i":[2]},"gloss":"and"},
			{"chars": {"d":"chars","i":[3,4]},"gloss":"free"},
			{"chars": {"d":"chars","i":[5]},"gloss":","},
			{"chars": {"d":"chars","i":[6]},"gloss":"at"},
			{"chars": {"d":"chars","i":[7,8]},"gloss":"dignity"},
			{"chars": {"d":"chars","i":[9]},"gloss":"and"},
			{"chars": {"d":"chars","i":[10,11]},"gloss":"freedom"},
			{"chars": {"d":"chars","i":[12]},"gloss":"on"},
			{"chars": {"d":"chars","i":[13,14]},"gloss":"uniformly"},
			{"chars": {"d":"chars","i":[15,16]},"gloss":"equal"},
			{"chars": {"d":"chars","i":[17]},"gloss":"."},
			{"chars": {"d":"chars","i":[18,19]},"gloss":"they"},
			{"chars": {"d":"chars","i":[20,21]},"gloss":"endowed with"},
			{"chars": {"d":"chars","i":[22,23]},"gloss":"reason"},
			{"chars": {"d":"chars","i":[24,25]},"gloss":"conscience"},
			{"chars": {"d":"chars","i":[26]},"gloss":"and"},
			{"chars": {"d":"chars","i":[27]},"gloss":"should"},
			{"chars": {"d":"chars","i":[28]},"gloss":"like"},
			{"chars": {"d":"chars","i":[29,30]},"gloss":"brothers"},
			{"chars": {"d":"chars","i":[31,32]},"gloss":"relationship"},
			{"chars": {"d":"chars","i":[33]},"gloss":"of"},
			{"chars": {"d":"chars","i":[34,35]},"gloss":"spirit"},
			{"chars": {"d":"chars","i":[36]},"gloss":"mutually"},
			{"chars": {"d":"chars","i":[37,38]},"gloss":"treat"}
		],
		"sents": [
			{"trans":"All human beings are born free and equal in dignity and rights.","lemmas":{"d":"lexicon","i":[0,1,2,3,4,5,6,7,8,9,10,11,12]}},
			{"trans":"They are endowed with reason and conscience and should treat each other in a spirit of brotherhood.","lemmas":{"d":"lexicon","i":[13,14,15,2,16,4,17,18,19,20,21,22,23,24,25,12]}}
		]
	}`)
	document.getElementById("commandinput").value = `chars DELIMITER ""
lexicon DELIMITER " "
TABLE DICT lexicon WHERE gloss IS "and" OR gloss IS "equal"`
	document.getElementById('displayresults').innerHTML = `This tiny corpus is just two lines from the Mandarin version of the Universal Declaration of Human Rights, which contains three dictionaries: "sents", "lexicon", and "chars". The search here is looking for any words in the corpus which have a gloss of "and" or "equal". To find all of the available properties, search "TABLE DICT sents", which will provide a table with all the sentences, with columns denoting each possible property. Underscores denote that the property is nested. For instance, the lemmas_gloss	column refers to the joined glosses of each lemma in the "lemmas" property of each sentence, while lemmas_chars_pinyin denotes the pinyin of each character within each lemma of the sentence.`
}

function example2(){
	processFileContent(`{
		"lexicon": [
			{
				"orthography": "han",
				"POS": "noun",
				"POS2": "common",
				"morphemes": {
					"d": "morphs",
					"i": [
						0
					]
				}
			},
			{
				"orthography": "i",
				"POS": "particle",
				"POS2": "case",
				"morphemes": {
					"d": "morphs",
					"i": [
						1
					]
				}
			},
			{
				"orthography": "araha",
				"POS": "verb",
				"POS2": "participle",
				"morphemes": {
					"d": "morphs",
					"i": [
						2,
						3
					]
				}
			},
			{
				"orthography": "e mo",
				"POS": "noun",
				"POS2": "common",
				"morphemes": {
					"d": "morphs",
					"i": [
						4
					]
				}
			},
			{
				"orthography": "gasha",
				"POS": "noun",
				"POS2": "common",
				"morphemes": {
					"d": "morphs",
					"i": [
						5
					]
				}
			},
			{
				"orthography": "be",
				"POS": "particle",
				"POS2": "case",
				"morphemes": {
					"d": "morphs",
					"i": [
						6
					]
				}
			},
			{
				"orthography": "irgebuhe",
				"POS": "verb",
				"POS2": "participle",
				"morphemes": {
					"d": "morphs",
					"i": [
						7,
						8
					]
				}
			},
			{
				"orthography": "juwan",
				"POS": "number",
				"POS2": "",
				"morphemes": {
					"d": "morphs",
					"i": [
						9
					]
				}
			},
			{
				"orthography": "mudan",
				"POS": "noun",
				"POS2": "common",
				"morphemes": {
					"d": "morphs",
					"i": [
						10
					]
				}
			},
			{
				"orthography": "irgebun",
				"POS": "noun",
				"POS2": "common",
				"morphemes": {
					"d": "morphs",
					"i": [
						11
					]
				}
			},
			{
				"orthography": ":",
				"POS": "punctuation",
				"POS2": "",
				"morphemes": {
					"d": "morphs",
					"i": [
						12
					]
				}
			},
			{
				"orthography": "te",
				"POS": "adverb",
				"POS2": "time",
				"morphemes": {
					"d": "morphs",
					"i": [
						13
					]
				}
			},
			{
				"orthography": "ere",
				"POS": "demonstrative",
				"POS2": "",
				"morphemes": {
					"d": "morphs",
					"i": [
						14
					]
				}
			},
			{
				"orthography": "h'alaba",
				"POS": "noun",
				"POS2": "proper",
				"morphemes": {
					"d": "morphs",
					"i": [
						15
					]
				}
			},
			{
				"orthography": ".",
				"POS": "punctuation",
				"POS2": "",
				"morphemes": {
					"d": "morphs",
					"i": [
						16
					]
				}
			},
			{
				"orthography": "tesu",
				"POS": "adjective",
				"POS2": "",
				"morphemes": {
					"d": "morphs",
					"i": [
						17
					]
				}
			},
			{
				"orthography": "bade",
				"POS": "noun",
				"POS2": "common",
				"morphemes": {
					"d": "morphs",
					"i": [
						18,
						19
					]
				}
			},
			{
				"orthography": "inu",
				"POS": "adverb",
				"POS2": "",
				"morphemes": {
					"d": "morphs",
					"i": [
						20
					]
				}
			},
			{
				"orthography": "tongga",
				"POS": "adjective",
				"POS2": "",
				"morphemes": {
					"d": "morphs",
					"i": [
						21
					]
				}
			},
			{
				"orthography": "sabumbi",
				"POS": "verb",
				"POS2": "finite",
				"morphemes": {
					"d": "morphs",
					"i": [
						22,
						23
					]
				}
			},
			{
				"orthography": "teike",
				"POS": "adverb",
				"POS2": "",
				"morphemes": {
					"d": "morphs",
					"i": [
						24
					]
				}
			},
			{
				"orthography": "mederi",
				"POS": "noun",
				"POS2": "common",
				"morphemes": {
					"d": "morphs",
					"i": [
						25
					]
				}
			},
			{
				"orthography": "jahūdai",
				"POS": "noun",
				"POS2": "common",
				"morphemes": {
					"d": "morphs",
					"i": [
						26
					]
				}
			},
			{
				"orthography": "deri",
				"POS": "particle",
				"POS2": "case",
				"morphemes": {
					"d": "morphs",
					"i": [
						27
					]
				}
			},
			{
				"orthography": "gajifi",
				"POS": "verb",
				"POS2": "converb",
				"morphemes": {
					"d": "morphs",
					"i": [
						28,
						29
					]
				}
			},
			{
				"orthography": "terei",
				"POS": "noun",
				"POS2": "demonstrative",
				"morphemes": {
					"d": "morphs",
					"i": [
						30,
						1
					]
				}
			},
			{
				"orthography": "arbun",
				"POS": "noun",
				"POS2": "common",
				"morphemes": {
					"d": "morphs",
					"i": [
						31
					]
				}
			},
			{
				"orthography": "cohome",
				"POS": "adverb",
				"POS2": "",
				"morphemes": {
					"d": "morphs",
					"i": [
						32
					]
				}
			},
			{
				"orthography": "nirubuhabi",
				"POS": "verb",
				"POS2": "finite",
				"morphemes": {
					"d": "morphs",
					"i": [
						33,
						34,
						35
					]
				}
			},
			{
				"orthography": "erebe",
				"POS": "noun",
				"POS2": "common",
				"morphemes": {
					"d": "morphs",
					"i": [
						14,
						6
					]
				}
			},
			{
				"orthography": "foranggiya",
				"POS": "noun",
				"POS2": "proper",
				"morphemes": {
					"d": "morphs",
					"i": [
						36
					]
				}
			},
			{
				"orthography": "ba",
				"POS": "noun",
				"POS2": "common",
				"morphemes": {
					"d": "morphs",
					"i": [
						18
					]
				}
			},
			{
				"orthography": "niyalma",
				"POS": "noun",
				"POS2": "common",
				"morphemes": {
					"d": "morphs",
					"i": [
						37
					]
				}
			},
			{
				"orthography": "de",
				"POS": "particle",
				"POS2": "case",
				"morphemes": {
					"d": "morphs",
					"i": [
						19
					]
				}
			},
			{
				"orthography": "takabufi",
				"POS": "verb",
				"POS2": "converb",
				"morphemes": {
					"d": "morphs",
					"i": [
						38,
						34,
						29
					]
				}
			},
			{
				"orthography": "da hūng",
				"POS": "noun",
				"POS2": "proper",
				"morphemes": {
					"d": "morphs",
					"i": [
						39
					]
				}
			},
			{
				"orthography": "tun",
				"POS": "noun",
				"POS2": "common",
				"morphemes": {
					"d": "morphs",
					"i": [
						40
					]
				}
			},
			{
				"orthography": "banjimbi",
				"POS": "verb",
				"POS2": "finite",
				"morphemes": {
					"d": "morphs",
					"i": [
						41,
						23
					]
				}
			},
			{
				"orthography": "sehe",
				"POS": "verb",
				"POS2": "participle",
				"morphemes": {
					"d": "morphs",
					"i": [
						42,
						8
					]
				}
			},
			{
				"orthography": "erei",
				"POS": "noun",
				"POS2": "demonstrative",
				"morphemes": {
					"d": "morphs",
					"i": [
						14,
						1
					]
				}
			},
			{
				"orthography": "nirugan",
				"POS": "noun",
				"POS2": "common",
				"morphemes": {
					"d": "morphs",
					"i": [
						43
					]
				}
			},
			{
				"orthography": "leolehe",
				"POS": "verb",
				"POS2": "participle",
				"morphemes": {
					"d": "morphs",
					"i": [
						44,
						8
					]
				}
			},
			{
				"orthography": "gisun",
				"POS": "noun",
				"POS2": "common",
				"morphemes": {
					"d": "morphs",
					"i": [
						45
					]
				}
			},
			{
				"orthography": "gemu",
				"POS": "adverb",
				"POS2": "",
				"morphemes": {
					"d": "morphs",
					"i": [
						46
					]
				}
			},
			{
				"orthography": "bi",
				"POS": "verb",
				"POS2": "finite",
				"morphemes": {
					"d": "morphs",
					"i": [
						47
					]
				}
			},
			{
				"orthography": "ejeme",
				"POS": "verb",
				"POS2": "converb",
				"morphemes": {
					"d": "morphs",
					"i": [
						48,
						49
					]
				}
			},
			{
				"orthography": "arahangge",
				"POS": "noun",
				"POS2": "derived",
				"morphemes": {
					"d": "morphs",
					"i": [
						2,
						3,
						50
					]
				}
			},
			{
				"orthography": "akūmbuha",
				"POS": "verb",
				"POS2": "participle",
				"morphemes": {
					"d": "morphs",
					"i": [
						51,
						3
					]
				}
			},
			{
				"orthography": "bime",
				"POS": "verb",
				"POS2": "converb",
				"morphemes": {
					"d": "morphs",
					"i": [
						47,
						49
					]
				}
			},
			{
				"orthography": "getukelehe",
				"POS": "verb",
				"POS2": "participle",
				"morphemes": {
					"d": "morphs",
					"i": [
						52,
						53,
						8
					]
				}
			},
			{
				"orthography": "banin",
				"POS": "noun",
				"POS2": "common",
				"morphemes": {
					"d": "morphs",
					"i": [
						54
					]
				}
			},
			{
				"orthography": "nomhon",
				"POS": "adjective",
				"POS2": "",
				"morphemes": {
					"d": "morphs",
					"i": [
						55
					]
				}
			},
			{
				"orthography": "ofi",
				"POS": "verb",
				"POS2": "converb",
				"morphemes": {
					"d": "morphs",
					"i": [
						56,
						29
					]
				}
			},
			{
				"orthography": "dasihirakū",
				"POS": "verb",
				"POS2": "participle",
				"morphemes": {
					"d": "morphs",
					"i": [
						57,
						58
					]
				}
			},
			{
				"orthography": "halhūn",
				"POS": "adjective",
				"POS2": "",
				"morphemes": {
					"d": "morphs",
					"i": [
						59
					]
				}
			},
			{
				"orthography": "baime",
				"POS": "verb",
				"POS2": "converb",
				"morphemes": {
					"d": "morphs",
					"i": [
						60,
						49
					]
				}
			},
			{
				"orthography": "beiguwen",
				"POS": "adjective",
				"POS2": "",
				"morphemes": {
					"d": "morphs",
					"i": [
						62
					]
				}
			},
			{
				"orthography": "sengguwembi",
				"POS": "verb",
				"POS2": "finite",
				"morphemes": {
					"d": "morphs",
					"i": [
						63,
						23
					]
				}
			},
			{
				"orthography": "banjiha",
				"POS": "verb",
				"POS2": "participle",
				"morphemes": {
					"d": "morphs",
					"i": [
						41,
						3
					]
				}
			},
			{
				"orthography": "beyei",
				"POS": "noun",
				"POS2": "common",
				"morphemes": {
					"d": "morphs",
					"i": [
						64,
						1
					]
				}
			},
			{
				"orthography": "gubci",
				"POS": "adverb",
				"POS2": "",
				"morphemes": {
					"d": "morphs",
					"i": [
						65
					]
				}
			},
			{
				"orthography": "funggaha",
				"POS": "noun",
				"POS2": "common",
				"morphemes": {
					"d": "morphs",
					"i": [
						66
					]
				}
			},
			{
				"orthography": "fulahūri",
				"POS": "adjective",
				"POS2": "color",
				"morphemes": {
					"d": "morphs",
					"i": [
						67
					]
				}
			},
			{
				"orthography": "boco",
				"POS": "noun",
				"POS2": "common",
				"morphemes": {
					"d": "morphs",
					"i": [
						68
					]
				}
			},
			{
				"orthography": "banitai",
				"POS": "adjective",
				"POS2": "derived",
				"morphemes": {
					"d": "morphs",
					"i": [
						69,
						70
					]
				}
			},
			{
				"orthography": "konggolo",
				"POS": "noun",
				"POS2": "common",
				"morphemes": {
					"d": "morphs",
					"i": [
						71
					]
				}
			},
			{
				"orthography": "fulgiyan",
				"POS": "adjective",
				"POS2": "color",
				"morphemes": {
					"d": "morphs",
					"i": [
						72
					]
				}
			},
			{
				"orthography": "sukū",
				"POS": "noun",
				"POS2": "common",
				"morphemes": {
					"d": "morphs",
					"i": [
						73
					]
				}
			},
			{
				"orthography": "tuheme",
				"POS": "verb",
				"POS2": "converb",
				"morphemes": {
					"d": "morphs",
					"i": [
						74,
						49
					]
				}
			},
			{
				"orthography": "banjihabi",
				"POS": "verb",
				"POS2": "finite",
				"morphemes": {
					"d": "morphs",
					"i": [
						41,
						35
					]
				}
			},
			{
				"orthography": "asha",
				"POS": "noun",
				"POS2": "common",
				"morphemes": {
					"d": "morphs",
					"i": [
						75
					]
				}
			},
			{
				"orthography": "dethe",
				"POS": "noun",
				"POS2": "common",
				"morphemes": {
					"d": "morphs",
					"i": [
						76
					]
				}
			},
			{
				"orthography": "akū",
				"POS": "particle",
				"POS2": "negation",
				"morphemes": {
					"d": "morphs",
					"i": [
						77
					]
				}
			},
			{
				"orthography": "deyeme",
				"POS": "verb",
				"POS2": "converb",
				"morphemes": {
					"d": "morphs",
					"i": [
						78,
						49
					]
				}
			},
			{
				"orthography": "muterakū",
				"POS": "verb",
				"POS2": "participle",
				"morphemes": {
					"d": "morphs",
					"i": [
						79,
						58
					]
				}
			},
			{
				"orthography": "an i",
				"POS": "adverb",
				"POS2": "",
				"morphemes": {
					"d": "morphs",
					"i": [
						80
					]
				}
			},
			{
				"orthography": "arbušacibe",
				"POS": "verb",
				"POS2": "participle",
				"morphemes": {
					"d": "morphs",
					"i": [
						81,
						82
					]
				}
			},
			{
				"orthography": "uncehen",
				"POS": "noun",
				"POS2": "common",
				"morphemes": {
					"d": "morphs",
					"i": [
						83
					]
				}
			},
			{
				"orthography": "mokto",
				"POS": "adjective",
				"POS2": "",
				"morphemes": {
					"d": "morphs",
					"i": [
						84
					]
				}
			},
			{
				"orthography": "saka",
				"POS": "adverb",
				"POS2": "",
				"morphemes": {
					"d": "morphs",
					"i": [
						85
					]
				}
			},
			{
				"orthography": "adarame",
				"POS": "pronoun",
				"POS2": "",
				"morphemes": {
					"d": "morphs",
					"i": [
						86
					]
				}
			},
			{
				"orthography": "bahafi",
				"POS": "verb",
				"POS2": "converb",
				"morphemes": {
					"d": "morphs",
					"i": [
						87,
						29
					]
				}
			},
			{
				"orthography": "ubade",
				"POS": "pronoun",
				"POS2": "",
				"morphemes": {
					"d": "morphs",
					"i": [
						88,
						19
					]
				}
			},
			{
				"orthography": "isinjiha",
				"POS": "verb",
				"POS2": "participle",
				"morphemes": {
					"d": "morphs",
					"i": [
						89,
						90,
						3
					]
				}
			},
			{
				"orthography": "ni",
				"POS": "particle",
				"POS2": "sentence final",
				"morphemes": {
					"d": "morphs",
					"i": [
						91
					]
				}
			},
			{
				"orthography": "aibici",
				"POS": "pronoun",
				"POS2": "",
				"morphemes": {
					"d": "morphs",
					"i": [
						92
					]
				}
			},
			{
				"orthography": "gajihangge",
				"POS": "noun",
				"POS2": "derived",
				"morphemes": {
					"d": "morphs",
					"i": [
						28,
						3,
						50
					]
				}
			},
			{
				"orthography": "geli",
				"POS": "adverb",
				"POS2": "",
				"morphemes": {
					"d": "morphs",
					"i": [
						93
					]
				}
			},
			{
				"orthography": "waka",
				"POS": "particle",
				"POS2": "negation",
				"morphemes": {
					"d": "morphs",
					"i": [
						94
					]
				}
			},
			{
				"orthography": "ume",
				"POS": "particle",
				"POS2": "negation",
				"morphemes": {
					"d": "morphs",
					"i": [
						95
					]
				}
			},
			{
				"orthography": "ši lo",
				"POS": "noun",
				"POS2": "proper",
				"morphemes": {
					"d": "morphs",
					"i": [
						96
					]
				}
			},
			{
				"orthography": "seme",
				"POS": "particle",
				"POS2": "complementizer",
				"morphemes": {
					"d": "morphs",
					"i": [
						97
					]
				}
			},
			{
				"orthography": "sabi",
				"POS": "noun",
				"POS2": "common",
				"morphemes": {
					"d": "morphs",
					"i": [
						98
					]
				}
			},
			{
				"orthography": "obure",
				"POS": "verb",
				"POS2": "participle",
				"morphemes": {
					"d": "morphs",
					"i": [
						99,
						100
					]
				}
			},
			{
				"orthography": "umesi",
				"POS": "adverb",
				"POS2": "",
				"morphemes": {
					"d": "morphs",
					"i": [
						101
					]
				}
			},
			{
				"orthography": "julge",
				"POS": "noun",
				"POS2": "common",
				"morphemes": {
					"d": "morphs",
					"i": [
						102
					]
				}
			},
			{
				"orthography": "hafan",
				"POS": "noun",
				"POS2": "common",
				"morphemes": {
					"d": "morphs",
					"i": [
						103
					]
				}
			},
			{
				"orthography": "hergen",
				"POS": "noun",
				"POS2": "common",
				"morphemes": {
					"d": "morphs",
					"i": [
						104
					]
				}
			},
			{
				"orthography": "obuhakū",
				"POS": "verb",
				"POS2": "participle",
				"morphemes": {
					"d": "morphs",
					"i": [
						99,
						105
					]
				}
			},
			{
				"orthography": "kai",
				"POS": "particle",
				"POS2": "sentence final",
				"morphemes": {
					"d": "morphs",
					"i": [
						106
					]
				}
			},
			{
				"orthography": "udu",
				"POS": "adverb",
				"POS2": "",
				"morphemes": {
					"d": "morphs",
					"i": [
						107
					]
				}
			},
			{
				"orthography": "ferguwecuke",
				"POS": "adjective",
				"POS2": "derived",
				"morphemes": {
					"d": "morphs",
					"i": [
						108,
						109
					]
				}
			},
			{
				"orthography": "obume",
				"POS": "verb",
				"POS2": "converb",
				"morphemes": {
					"d": "morphs",
					"i": [
						99,
						49
					]
				}
			},
			{
				"orthography": "ujirakū",
				"POS": "verb",
				"POS2": "participle",
				"morphemes": {
					"d": "morphs",
					"i": [
						110,
						58
					]
				}
			},
			{
				"orthography": "bicibe",
				"POS": "verb",
				"POS2": "converb",
				"morphemes": {
					"d": "morphs",
					"i": [
						47,
						82
					]
				}
			},
			{
				"orthography": "ulabuha",
				"POS": "verb",
				"POS2": "participle",
				"morphemes": {
					"d": "morphs",
					"i": [
						111,
						34,
						3
					]
				}
			},
			{
				"orthography": "manggi",
				"POS": "adverb",
				"POS2": "",
				"morphemes": {
					"d": "morphs",
					"i": [
						113
					]
				}
			},
			{
				"orthography": "emu",
				"POS": "number",
				"POS2": "",
				"morphemes": {
					"d": "morphs",
					"i": [
						114
					]
				}
			},
			{
				"orthography": "donjin",
				"POS": "noun",
				"POS2": "derived",
				"morphemes": {
					"d": "morphs",
					"i": [
						115
					]
				}
			}
		],
		"morphs": [
			{
				"orth": "han",
				"gloss": "emperor"
			},
			{
				"orth": "i",
				"gloss": "GEN"
			},
			{
				"orth": "ara",
				"gloss": "write"
			},
			{
				"orth": "ha",
				"gloss": "PFV"
			},
			{
				"orth": "e mo",
				"gloss": "cassowary"
			},
			{
				"orth": "gasha",
				"gloss": "bird"
			},
			{
				"orth": "be",
				"gloss": "ACC"
			},
			{
				"orth": "irgebu",
				"gloss": "compose"
			},
			{
				"orth": "he",
				"gloss": "PFV"
			},
			{
				"orth": "juwan",
				"gloss": "ten"
			},
			{
				"orth": "mudan",
				"gloss": "couplet"
			},
			{
				"orth": "irgebun",
				"gloss": "poem"
			},
			{
				"orth": ":",
				"gloss": "."
			},
			{
				"orth": "te",
				"gloss": "now"
			},
			{
				"orth": "ere",
				"gloss": "this"
			},
			{
				"orth": "h'alaba",
				"gloss": "Indonesia"
			},
			{
				"orth": ".",
				"gloss": ","
			},
			{
				"orth": "tesu",
				"gloss": "native"
			},
			{
				"orth": "ba",
				"gloss": "place"
			},
			{
				"orth": "de",
				"gloss": "DAT"
			},
			{
				"orth": "inu",
				"gloss": "also"
			},
			{
				"orth": "tongga",
				"gloss": "few"
			},
			{
				"orth": "sabu",
				"gloss": "recognize"
			},
			{
				"orth": "mbi",
				"gloss": "FIN"
			},
			{
				"orth": "teike",
				"gloss": "just"
			},
			{
				"orth": "mederi",
				"gloss": "sea"
			},
			{
				"orth": "jahūdai",
				"gloss": "boat"
			},
			{
				"orth": "deri",
				"gloss": "ABL"
			},
			{
				"orth": "gaji",
				"gloss": "take"
			},
			{
				"orth": "fi",
				"gloss": "PFV.CVB"
			},
			{
				"orth": "tere",
				"gloss": "that"
			},
			{
				"orth": "arbun",
				"gloss": "picture"
			},
			{
				"orth": "cohome",
				"gloss": "especially"
			},
			{
				"orth": "niru",
				"gloss": "paint"
			},
			{
				"orth": "bu",
				"gloss": "CAUS"
			},
			{
				"orth": "habi",
				"gloss": "PFV.FIN"
			},
			{
				"orth": "foranggiya",
				"gloss": "France"
			},
			{
				"orth": "niyalma",
				"gloss": "person"
			},
			{
				"orth": "taka",
				"gloss": "know"
			},
			{
				"orth": "da hūng",
				"gloss": "Dahūng"
			},
			{
				"orth": "tun",
				"gloss": "island"
			},
			{
				"orth": "banji",
				"gloss": "live"
			},
			{
				"orth": "se",
				"gloss": "say"
			},
			{
				"orth": "nirugan",
				"gloss": "image"
			},
			{
				"orth": "leole",
				"gloss": "discuss"
			},
			{
				"orth": "gisun",
				"gloss": "language"
			},
			{
				"orth": "gemu",
				"gloss": "all"
			},
			{
				"orth": "bi",
				"gloss": "COP"
			},
			{
				"orth": "eje",
				"gloss": "account"
			},
			{
				"orth": "me",
				"gloss": "IPFV.CVB"
			},
			{
				"orth": "ngge",
				"gloss": "NMZ"
			},
			{
				"orth": "akūmbu",
				"gloss": "complete"
			},
			{
				"orth": "getuke",
				"gloss": "clear"
			},
			{
				"orth": "le",
				"gloss": "VBZ"
			},
			{
				"orth": "banin",
				"gloss": "nature"
			},
			{
				"orth": "nomhon",
				"gloss": "quiet"
			},
			{
				"orth": "o",
				"gloss": "become"
			},
			{
				"orth": "dasihi",
				"gloss": "swoop.and.seize"
			},
			{
				"orth": "rakū",
				"gloss": "NEG.IPFV"
			},
			{
				"orth": "halhūn",
				"gloss": "hot"
			},
			{
				"orth": "bai",
				"gloss": "seek"
			},
			{
				"orth": "me",
				"gloss": "IPV.CVB"
			},
			{
				"orth": "beiguwen",
				"gloss": "frost"
			},
			{
				"orth": "sengguwe",
				"gloss": "fear"
			},
			{
				"orth": "beye",
				"gloss": "self"
			},
			{
				"orth": "gubci",
				"gloss": "all"
			},
			{
				"orth": "funggaha",
				"gloss": "feather"
			},
			{
				"orth": "fulahūri",
				"gloss": "deep.red"
			},
			{
				"orth": "boco",
				"gloss": "color"
			},
			{
				"orth": "bani",
				"gloss": "natural"
			},
			{
				"orth": "tai",
				"gloss": "INSTR.CVB"
			},
			{
				"orth": "konggolo",
				"gloss": "crop"
			},
			{
				"orth": "fulgiyan",
				"gloss": "red"
			},
			{
				"orth": "sukū",
				"gloss": "pelt"
			},
			{
				"orth": "tuhe",
				"gloss": "fall"
			},
			{
				"orth": "asha",
				"gloss": "wing"
			},
			{
				"orth": "dethe",
				"gloss": "pinion.feather"
			},
			{
				"orth": "akū",
				"gloss": "NEG"
			},
			{
				"orth": "deye",
				"gloss": "fly"
			},
			{
				"orth": "mute",
				"gloss": "can"
			},
			{
				"orth": "an i",
				"gloss": "normally"
			},
			{
				"orth": "arbuša",
				"gloss": "move"
			},
			{
				"orth": "cibe",
				"gloss": "CONC"
			},
			{
				"orth": "uncehen",
				"gloss": "tail"
			},
			{
				"orth": "mokto",
				"gloss": "bald"
			},
			{
				"orth": "saka",
				"gloss": "somewhat"
			},
			{
				"orth": "adarame",
				"gloss": "how"
			},
			{
				"orth": "baha",
				"gloss": "obtain"
			},
			{
				"orth": "uba",
				"gloss": "here"
			},
			{
				"orth": "isi",
				"gloss": "arrive"
			},
			{
				"orth": "nji",
				"gloss": "VEN"
			},
			{
				"orth": "ni",
				"gloss": "Q"
			},
			{
				"orth": "aibici",
				"gloss": "whence"
			},
			{
				"orth": "geli",
				"gloss": "also"
			},
			{
				"orth": "waka",
				"gloss": "NEG.COP"
			},
			{
				"orth": "ume",
				"gloss": "do.not"
			},
			{
				"orth": "ši lo",
				"gloss": "Šilo"
			},
			{
				"orth": "seme",
				"gloss": "COMP"
			},
			{
				"orth": "sabi",
				"gloss": "good.omen"
			},
			{
				"orth": "obu",
				"gloss": "take.as"
			},
			{
				"orth": "re",
				"gloss": "IPFV"
			},
			{
				"orth": "umesi",
				"gloss": "very"
			},
			{
				"orth": "julge",
				"gloss": "antiquity"
			},
			{
				"orth": "hafan",
				"gloss": "official"
			},
			{
				"orth": "hergen",
				"gloss": "rank"
			},
			{
				"orth": "hakū",
				"gloss": "NEG.PFV"
			},
			{
				"orth": "kai",
				"gloss": "EXCLAM"
			},
			{
				"orth": "udu",
				"gloss": "such"
			},
			{
				"orth": "ferguwe",
				"gloss": "wonder"
			},
			{
				"orth": "cuke",
				"gloss": "ADJ"
			},
			{
				"orth": "uji",
				"gloss": "nourish"
			},
			{
				"orth": "ula",
				"gloss": "hand.down"
			},
			{
				"orth": "bu",
				"gloss": "CAUSE"
			},
			{
				"orth": "manggi",
				"gloss": "after"
			},
			{
				"orth": "emu",
				"gloss": "one"
			},
			{
				"orth": "donjin",
				"gloss": "heard.thing"
			}
		],
		"lines": [
			{
				"plaintext": "han i araha e mo gasha be irgebuhe juwan mudan i irgebun:",
				"translation": "Poem in Ten Rhymes on the Cassowary Written by the Emperor.",
				"words": {
					"d": "lexicon",
					"i": [
						0,
						1,
						2,
						3,
						4,
						5,
						6,
						7,
						8,
						1,
						9,
						10
					]
				}
			},
			{
				"plaintext": "te i ere h'alaba i gasha.",
				"translation": "This bird of Indonesia",
				"words": {
					"d": "lexicon",
					"i": [
						11,
						1,
						12,
						13,
						1,
						4,
						14
					]
				}
			},
			{
				"plaintext": "tesu bade inu tongga sabumbi.",
				"translation": "is rarely seen in its native country.",
				"words": {
					"d": "lexicon",
					"i": [
						15,
						16,
						17,
						18,
						19,
						14
					]
				}
			},
			{
				"plaintext": "teike mederi jahūdai deri gajifi.",
				"translation": "Recently it has been brought from a ship",
				"words": {
					"d": "lexicon",
					"i": [
						20,
						21,
						22,
						23,
						24,
						14
					]
				}
			},
			{
				"plaintext": "terei arbun be cohome nirubuhabi:",
				"translation": "and its picture has been especially painted.",
				"words": {
					"d": "lexicon",
					"i": [
						25,
						26,
						5,
						27,
						28,
						10
					]
				}
			},
			{
				"plaintext": "erebe foranggiya ba i niyalma de takabufi.",
				"translation": "It is said to have been discovered by people from France",
				"words": {
					"d": "lexicon",
					"i": [
						29,
						30,
						31,
						1,
						32,
						33,
						34,
						14
					]
				}
			},
			{
				"plaintext": "ere da hūng mederi tun de banjimbi sehe.",
				"translation": "and to live on an island of the Da hūng sea.",
				"words": {
					"d": "lexicon",
					"i": [
						12,
						35,
						21,
						36,
						33,
						37,
						38,
						14
					]
				}
			},
			{
				"plaintext": "erei nirugan leolehe gisun gemu bi.",
				"translation": "Here are its image and description.",
				"words": {
					"d": "lexicon",
					"i": [
						39,
						40,
						41,
						42,
						43,
						44,
						14
					]
				}
			},
			{
				"plaintext": "ejeme arahangge akūmbuha bime getukelehe:",
				"translation": "Record of it has been made complete and it has been explained.",
				"words": {
					"d": "lexicon",
					"i": [
						45,
						46,
						47,
						48,
						49,
						10
					]
				}
			},
			{
				"plaintext": "banin nomhon ofi dasihirakū.",
				"translation": "Quiet by nature, it is no bird of prey.",
				"words": {
					"d": "lexicon",
					"i": [
						50,
						51,
						52,
						53,
						14
					]
				}
			},
			{
				"plaintext": "ba i halhūn be baime beiguwen de sengguwembi.",
				"translation": "Seeking heat, it fears cold.",
				"words": {
					"d": "lexicon",
					"i": [
						31,
						1,
						54,
						5,
						55,
						56,
						33,
						57,
						14
					]
				}
			},
			{
				"plaintext": "banjiha beyei gubci funggaha fulahūri boco bime.",
				"translation": "All feathers of its body are deep-red",
				"words": {
					"d": "lexicon",
					"i": [
						58,
						59,
						60,
						61,
						62,
						63,
						48,
						14
					]
				}
			},
			{
				"plaintext": "banitai konggolo de fulgiyan sukū tuheme banjihabi:",
				"translation": "and its crop is made of red skin at the bottom.",
				"words": {
					"d": "lexicon",
					"i": [
						64,
						65,
						33,
						66,
						67,
						68,
						69,
						10
					]
				}
			},
			{
				"plaintext": "asha de dethe akū ofi deyeme muterakū.",
				"translation": "Because its wings have no pinions, it cannot fly.",
				"words": {
					"d": "lexicon",
					"i": [
						70,
						33,
						71,
						72,
						52,
						73,
						74,
						14
					]
				}
			},
			{
				"plaintext": "an i arbušacibe uncehen mokto saka.",
				"translation": "While it moves normally, the tail is somewhat bald.",
				"words": {
					"d": "lexicon",
					"i": [
						75,
						76,
						77,
						78,
						79,
						14
					]
				}
			},
			{
				"plaintext": "adarame bahafi ubade isinjiha ni.",
				"translation": "How did it manage to come here?",
				"words": {
					"d": "lexicon",
					"i": [
						80,
						81,
						82,
						83,
						84,
						14
					]
				}
			},
			{
				"plaintext": "aibici baime gajihangge geli waka.",
				"translation": "Looking everywhere, no one has brought it.",
				"words": {
					"d": "lexicon",
					"i": [
						85,
						55,
						86,
						87,
						88,
						14
					]
				}
			},
			{
				"plaintext": "ume ši lo gasha seme sabi obure.",
				"translation": "Do not mistake it for the ši lo bird, taking it as a good omen,",
				"words": {
					"d": "lexicon",
					"i": [
						89,
						90,
						4,
						91,
						92,
						93,
						14
					]
				}
			},
			{
				"plaintext": "umesi julge de hafan i hergen obuhakū kai.",
				"translation": "It was not chosen as a rank badge for officials.",
				"words": {
					"d": "lexicon",
					"i": [
						94,
						95,
						33,
						96,
						1,
						97,
						98,
						99,
						14
					]
				}
			},
			{
				"plaintext": "udu ferguwecuke gasha obume ujirakū bicibe.",
				"translation": "Although this marvelous bird cannot be fed,",
				"words": {
					"d": "lexicon",
					"i": [
						100,
						101,
						4,
						102,
						103,
						104,
						14
					]
				}
			},
			{
				"plaintext": "ulabuha manggi inu emu tongga donjin kai:",
				"translation": "after it has been handed down, it is indeed a rare thing to hear.",
				"words": {
					"d": "lexicon",
					"i": [
						105,
						106,
						17,
						107,
						18,
						108,
						99,
						10
					]
				}
			}
		],
		"poems":[
			{
				"title":{
					"d":"lines",
					"i":[0]
				},
				"author":"Qianlong",
				"translator":"Guillaume Lescuyer",
				"glosser":"Jack Isaac Rabinovitch",
				"content":{
					"d":"lines",
					"i":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
				}
			}
		]
	}`)
	document.getElementById("commandinput").value = `morphs DELIMITER "-"
lexicon DELIMITER " "
TABLE (DICT lines WHERE words CONTAINS (DICT lexicon WHERE POS2 IS "sentence final"))`
	document.getElementById('displayresults').innerHTML = `This example is a corpus containing a single Manchu poem, written by the Qianlong Emperor, called <i>Han i Araha E Mo Gasha be Irgebuhe Juwan Mudan i Irgebun</i>, or <i>Poem in Ten Rhymes on the Cassowary Written by the Emperor</i>. I found this poem, and its translation through Guillaume Lescuyer's <a href="https://talesofmanchulife.wordpress.com/2018/05/18/a-manchu-poem-about-cassowaries-by-qianlong/">Blog</a>. The corpus is divided into four dictionaries: named "poems", "lines", "lexicon", and "morphs". The current search is looking for all lines in the corpus which contain lexical items which are sentence final particles (POS2 being a narrow part of speech tag), parenthesis enclose the command to make sure that TABLE does not apply to any part before the whole Reference List is created.`
}
