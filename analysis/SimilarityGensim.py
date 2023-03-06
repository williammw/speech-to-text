import jieba
from gensim import corpora, models, similarities

# Load the two articles
with open('article1.txt', 'r', encoding='utf-8') as f:
    article1 = f.read()
with open('article2.txt', 'r', encoding='utf-8') as f:
    article2 = f.read()

# Tokenize the articles using jieba
article1_tokens = list(jieba.cut(article1))
article2_tokens = list(jieba.cut(article2))

# Create dictionary and corpus using gensim
dictionary = corpora.Dictionary([article1_tokens, article2_tokens])
corpus = [dictionary.doc2bow(text)
          for text in [article1_tokens, article2_tokens]]

# Train TF-IDF model
tfidf = models.TfidfModel(corpus)

# Apply TF-IDF transformation to corpus
corpus_tfidf = tfidf[corpus]

# Create similarity index using cosine similarity
index = similarities.MatrixSimilarity(corpus_tfidf)

# Get similarity score between article1 and article2
similarity_score = index[corpus_tfidf[0]][1]

print(similarity_score)
``
