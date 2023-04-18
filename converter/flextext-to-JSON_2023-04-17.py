import xml.etree.ElementTree as ET
import json
import time
import math

readfile = "INSERT READ FILE NAME.flextext"
writefile = "INSERT WRITE FILE NAME.json"

start = time.time()

print("Reading file...")

flextext = open(readfile,"r",encoding='utf-8')
root = ET.parse(flextext).getroot()
flextext.close()

def printplur(number,singular,plural=None):
	if number == 1:
		return f'{number} {singular}'
	elif plural is None:
		return f'{number} {singular}s'
	else:
		return f'{number} {plural}'

def printtime(t):
	newt = t
	hours = math.floor(newt/3600)
	newt = newt - hours*3600
	minutes = math.floor(newt/60)
	newt = newt - minutes*60
	seconds = math.floor(newt)
	if hours == 0:
		if minutes == 0:
			return printplur(seconds,"second")				
		else:
			return f'{printplur(minutes,"minute")} and {printplur(seconds,"second")}'
	else:
			return f'{printplur(hours,"hour")}, {printplur(minutes,"minute")} and {printplur(seconds,"second")}'

def cn(res):
	if res is None:
		return ""
	return res.replace('"',"\\\"")

def strarrtonumarr(arr):
	return [int(numeric_string) for numeric_string in arr]


print("Defining classes...")

class Entry:
	def __init__(self,content,id):
		self.id = id
		self.content = content

class Dictionary:
	def __init__(self,entries):
		self.entries = entries
		self.length = len(self.entries)
	def update(self,content):
		self.entries.append(Entry(content,str(self.length)))
		self.length += 1
	def findid(self,entry):
		k = list(filter(lambda x: x.content == entry, self.entries))
		if len(k) == 1:
			return k[0].id
	def findentry(self,id):
		k = list(filter(lambda x: x.id == id, self.entries))
		if len(k) == 1:
			return k[0].content
	def asJSON(self):
		res = []
		for i in self.entries:
			res.append(i.content.asJSON())
		return res
	
def toJSON(array):
	res = []
	for i in array:
		res.append(i.asJSON())
	return res

def scan(dictionary,content):
	if dictionary.findid(content) is None:
		dictionary.update(content)
	return {
		"dictionary":dictionary,
		"reference":dictionary.findid(content)
	}

class Morph:
	def __init__(self,element,jsonback=None):
		if jsonback is None:
			self.type = cn(element.get('type'))
			self.txt = ""
			self.cf = ""
			self.hn = ""
			self.gls = ""
			self.msa = ""
			for attribute in element.findall('item'):
				if hasattr(self,attribute.get('type')):
					setattr(self,attribute.get('type'),cn(attribute.text))
		else:
			self.type=jsonback["type"]
			self.txt=jsonback["txt"]
			self.cf=jsonback["cf"]
			self.hn=jsonback["hn"]
			self.gls=jsonback["gls"]
			self.msa=jsonback["msa"]
	def __eq__(self, other): 
		if not isinstance(other, Morph):
			return NotImplemented
		return self.type == other.type and self.txt == other.txt and self.cf == other.cf and self.gls == other.gls and self.msa == other.msa
	def asJSON(self):
		return {
		"type":self.type,
		"txt":self.txt,
		"hn":self.hn,
		"cf":self.cf,
		"gls":self.gls,
		"msa":self.msa
		}

class Word:
	def __init__(self,element,jsonback=None):
		if jsonback is None:
			self.txt = ""
			self.gls = ""
			self.pos = ""
			self.punct = ""
			for attribute in element.findall('item'):
				if hasattr(self,attribute.get('type')):
					setattr(self,attribute.get('type'),cn(attribute.text))
			if element.find('morphemes') is None:
				self.morphemes = []
			else:
				self.morphemes = element.find('morphemes').text.split(",")
		else:
			self.txt = jsonback["txt"]
			self.gls = jsonback["gls"]
			self.pos = jsonback["pos"]
			self.punct = jsonback["punct"]
			self.morphemes = jsonback["morphemes"]
	def __eq__(self, other): 
		if not isinstance(other, Word):
			return NotImplemented
		return self.txt == other.txt and self.pos == other.pos and self.gls == other.gls and self.punct == other.punct and self.morphemes == other.morphemes
	def asJSON(self):
		return {
		"txt":self.txt,
		"gls":self.gls,
		"pos":self.pos,
		"punct":self.punct,
		"morphs":{"d":"morphs","i":strarrtonumarr(self.morphemes)}
		}


class Phrase:
	def __init__(self,element,jsonback=None):
		if jsonback is None:
			self.gls = ""
			for attribute in element.findall('item'):
				if hasattr(self,attribute.get('type')):
					setattr(self,attribute.get('type'),cn(attribute.text))
			if element.find('words') is None:
				self.words = []
			else:
				self.words = element.find('words').text.split(",")
		else:
			self.gls = jsonback["gls"]
			self.words = jsonback["words"]
	def asJSON(self):
		return {
		"gls":self.gls,
		"words":{"d":"words","i":strarrtonumarr(self.words)}
		}
	
class Text:
	def __init__(self,element,jsonback=None):
		if jsonback is None:
			self.title = ""
			for attribute in element.findall('item'):
				if hasattr(self,attribute.get('type')):
					setattr(self,attribute.get('type'),cn(attribute.text))
			paraphrases = []
			for phrases in list(element.iter('phrases')):
				paraphrases.append(phrases.text)
			self.phrases = ",".join(paraphrases).split(",")
		else:
			self.title = jsonback["title"]
			self.phrases = jsonback["phrases"]
	def asJSON(self):
		return {
		"title":self.title,
		"phrases":{"d":"phrases","i":strarrtonumarr(self.phrases)}
		}

print("Compiling morpheme dictionary...")

morphDict = Dictionary([])

total = len(list(root.iter("morph")))
itemcount = 1
thetime = time.time()

for morph in list(root.iter('morph')):
	thescan = scan(morphDict,Morph(morph))
	morphDict = thescan["dictionary"]
	for child in list(morph):
		morph.remove(child)
	morph.text = thescan["reference"]
	itemcount += 1
	if time.time() - thetime > 12:
		thetime = time.time()
		print(f'Morph dictionary {"%.1f" % ((100*itemcount)/total,)}% completed')

print("Replacing morphemes with reference identifiers in corpus...")

for morphemes in list(root.iter('morphemes')):
	morphlist = []
	for child in list(morphemes):
		morphlist.append(child.text)
		morphemes.remove(child)
	morphemes.text = ",".join(morphlist)

print("Compiling word dictionary...")

wordDict = Dictionary([])

total = len(list(root.iter("word")))
itemcount = 1
thetime = time.time()

for word in list(root.iter('word')):
	thescan = scan(wordDict,Word(word))
	wordDict = thescan["dictionary"]
	for child in list(word):
		word.remove(child)
	word.text = thescan["reference"]
	itemcount += 1
	if time.time() - thetime > 12:
		thetime = time.time()
		print(f'Word dictionary {"%.1f" % ((100*itemcount)/total,)}% completed')

print("Replacing words with reference identifiers in corpus...")

for words in list(root.iter('words')):
	wordlist = []
	for child in list(words):
		wordlist.append(child.text)
		words.remove(child)
	words.text = ",".join(wordlist)

print("Compiling phrases...")

phraseDict = Dictionary([])

total = len(list(root.iter("phrase")))
itemcount = 1
thetime = time.time()

for phrase in list(root.iter('phrase')):
	thescan = scan(phraseDict,Phrase(phrase))
	phraseDict = thescan["dictionary"]
	for child in list(phrase):
		phrase.remove(child)
	phrase.text = thescan["reference"]
	itemcount += 1
	if time.time() - thetime > 12:
		thetime = time.time()
		print(f'Phrase dictionary {"%.1f" % ((100*itemcount)/total,)}% completed')

print("Replacing phrases with reference identifiers in corpus...")

for phrases in list(root.iter('phrases')):
	phraselist = []
	for child in list(phrases):
		phraselist.append(child.text)
		phrases.remove(child)
	phrases.text = ",".join(phraselist)

print("Compiling texts...")

textDict = Dictionary([])

total = len(list(root.iter("interlinear-text")))
itemcount = 1
thetime = time.time()

for text in list(root.iter('interlinear-text')):
	thescan = scan(textDict,Text(text))
	textDict = thescan["dictionary"]
	for child in list(text):
		text.remove(child)
	text.text = thescan["reference"]
	itemcount += 1
	if time.time() - thetime > 12:
		thetime = time.time()
		print(f'Text dictionary {"%.1f" % ((100*itemcount)/total,)}% completed')

result = {
	"morphs": morphDict.asJSON(),
	"words": wordDict.asJSON(),
	"phrases": phraseDict.asJSON(),
	"texts": textDict.asJSON()	
}


print("Writing file...")

writefile = open(writefile,"w",encoding='utf-8')
json.dump(result,writefile,ensure_ascii=False)
writefile.close()

print(f'Flextext compilation completed. Total duration: {printtime(time.time() - start)}')


