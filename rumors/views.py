from django.http import HttpResponse, JsonResponse, FileResponse
from django.shortcuts import render, redirect
from datetime import datetime
import os
import re
import jieba
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import confusion_matrix
import jieba
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import GridSearchCV
from sklearn.tree import DecisionTreeClassifier
import json
from tensorflow.keras.models import Sequential
from tensorflow.keras import layers
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences

def index(request):
    return redirect("rumor/rumortitle/")

def showcontent(request):
    contentlist = {}
    if request.method == "GET":
        title = request.GET.get("param", None)
        # title = "云南昆明出现新确诊新冠肺炎病例？"
        df = pd.read_csv("data1.csv")
        titilelist = df['title'].tolist()
        contentlist = df['content'].tolist()
        for i in range(len(titilelist)):
            if title == titilelist[i]:
                content = contentlist[i]
                break
    if "\u3000" in content:
        content = content.replace("\u3000", "\n\t")
    contentlist = {"content": content,"title":title}
    print(contentlist)
    # return HttpResponse(json.dumps(contentlist, ensure_ascii=False))
    return render(request,"contentshow.html",{"contentresult":contentlist})

def match(request):
    datalist = []
    titlelist = []
    timelist = []
    statelist = []
    if request.method == "GET":
        rumortitle = request.GET.get("rumortitle", None)
        if rumortitle != None:
            rumortitlelist = []
            rumortitlelist.append(" ".join(jieba.cut(rumortitle)))
            data = pd.read_csv("data1.csv")
            i = 0
            titlelist = data['title']
            timelist = data['time']
            statelist = data['state']
            for title in titlelist:
                title_splitlist = []
                i = i+1
                title_split = " ".join(jieba.cut(title))
                title_splitlist.append(title_split)
                for rumortitle in rumortitlelist:
                    # if rumortitle in title_splitlist:
                    if any(rumortitle in title_splits for title_splits in title_splitlist):
                        # print(titlelist[i-1])
                        d = {"title":titlelist[i-1],"time":timelist[i-1]\
                             ,"state":statelist[i-1]}
                        datalist.append(d)
    return render(request,"rumor.html",{"data":datalist})

def judge(request):
    titleresult = {}
    if request.method == "GET":
        title = request.GET.get("news",None)
        print(title)
        if title != None:
            # sents_final = []
            # sents_final0 = []
            # sents_final2 = []
            # sents_final3 = []
            # df0 = pd.read_csv("data1.csv")
            # labels0 = df0['state'].tolist()
            # sents0 = df0['title'].tolist()
            # print("数量0：",sents0)
            # for sent0 in sents0:
            #     sent_final0 = " ".join(jieba.cut(sent0))
            #     sents_final0.append(sent_final0)
            #
            # df2 = pd.read_csv("data2.csv")
            # labels2 = df2['state'].tolist()
            # sents2 = df2['title'].tolist()
            # print("数量2：",sents2)
            # for sent2 in sents2:
            #     sent_final2 = " ".join(jieba.cut(sent2))
            #     sents_final2.append(sent_final2)
            #
            # df3 = pd.read_csv("data3.csv")
            # labels3 = df3['state'].tolist()
            # sents3 = df3['title'].tolist()
            # print("数量3：", sents3)
            # for sent3 in sents3:
            #     sent_final3 = " ".join(jieba.cut(sent3))
            #     sents_final3.append(sent_final3)
            #
            # labels = labels0 + labels2 +labels3
            # sents_final = sents_final0 +sents_final2 +sents_final3
            # print(len(labels))
            # X_train, X_test, y_train, y_test = train_test_split(sents_final, labels, test_size=0.25, random_state=42)
            # transfer = TfidfVectorizer()
            # X_train = transfer.fit_transform(X_train)
            # # print(X_test)
            # X_test = transfer.transform(X_test)
            # # print(X_test.shape)
            # # print(X_train.shape)
            #
            # # estimator = KNeighborsClassifier()
            # # para_dict = {"n_neighbors":[1,2,3,4,5,6,7,8,9,10]}
            # # estimator = GridSearchCV(estimator,param_grid=para_dict,cv=10)
            # estimator = DecisionTreeClassifier()
            # estimator.fit(X_train, y_train)
            # y_predit = estimator.predict(X_test)
            # score = estimator.score(X_test, y_test)
            # new_final = []
            # new_final.append(" ".join(jieba.cut(title)))
            # print(new_final)
            # data_new_test = transfer.transform(new_final)
            # print(data_new_test.shape)
            # y_predit1 = estimator.predict(data_new_test)
            # print("预测结果：", y_predit1)
            # print("准确率为：", score)
            # # print("最佳参数：",estimator.best_params_)
            # # print("最佳结果：",estimator.best_score_)
            # titleresult = {"title": y_predit1}

            sents_final1 = []
            sents_final2 = []
            sents_final3 = []
            labels1 = []
            labels2 = []
            labels3 = []
            sents_final = []
            labels_final = []

            df = pd.read_csv("data1.csv")
            labels = df['state'].tolist()
            for label in labels:
                if "误区" == label:
                    label = label.replace("误区", "谣言")
                if "辟谣" == label:
                    label = label.replace("辟谣", "谣言")
                labels1.append(label)
            # for label_formal in labels_formal:
            #     if "谣言" == label_formal:
            #         label = label_formal.replace("谣言", "1")
            #     if "事实" == label_formal:
            #         label = label_formal.replace("事实", "0")
            #     labels1.append(label)
            sents = df['title'].tolist()
            for sent in sents:
                sent_none_num = re.sub(r'[0-9]+', "", sent)
                sent_none_num_and_eng = re.sub(r'[a-zA-Z]+', "", sent_none_num)
                if "？" in sent:
                    sent_none_num_eng_punct = sent_none_num_and_eng.replace("？", "")
                sent_final = " ".join(jieba.cut(sent_none_num_eng_punct))
                sents_final1.append(sent_final)
            # print(sents_final)

            df2 = pd.read_csv("data2.csv")
            labels2 = df2['state'].tolist()
            sents2 = df2['title'].tolist()
            print("数量2：", sents2)
            for sent2 in sents2:
                sent_final2 = " ".join(jieba.cut(sent2))
                sents_final2.append(sent_final2)

            df3 = pd.read_csv("data3.csv")
            labels3 = df3['state'].tolist()
            sents3 = df3['title'].tolist()
            print("数量3：", sents3)
            for sent3 in sents3:
                sent_final3 = " ".join(jieba.cut(sent3))
                sents_final3.append(sent_final3)

            labels = labels1 + labels2 + labels3
            sents_final = sents_final1 + sents_final2 + sents_final3

            for label in labels:
                if "谣言" == label:
                    label = label.replace("谣言", "1")
                if "事实" == label:
                    label = label.replace("事实", "0")
                labels_final.append(label)

            sen_train, sen_test, y_train, y_test = train_test_split(sents_final, labels_final, test_size=0.25,
                                                                    random_state=42)
            print(sen_train)

            tokenizer = Tokenizer(num_words=800)
            # 对统计单词出现数量后选择次数多的前n个单词，后面的单词都不做处理
            tokenizer.fit_on_texts(sen_train)
            # 使用字典将对应词转成index。shape为 (文档数，每条文档的长度)
            # 把所有词转化为索引
            x_train = tokenizer.texts_to_sequences(sen_train)
            print("x_train", x_train)
            print(len(x_train))
            x_test = tokenizer.texts_to_sequences(sen_test)
            print("x_test", x_test)
            print(len(x_test))
            # 非重复词+1
            vocab_size = len(tokenizer.word_index) + 1
            print(sen_train[2])
            print(x_train[2])

            # 补齐
            maxlen = 8
            x_train = pad_sequences(x_train, padding='post', maxlen=maxlen)
            x_test = pad_sequences(x_test, padding='post', maxlen=maxlen)
            print(x_train[2, :])

            y_train_int = list(map(int, y_train))
            y_train = np.array(y_train_int)

            y_test_int = list(map(int, y_test))
            y_test = np.array(y_test_int)

            embedding_dim = 20
            model = Sequential()
            model.add(layers.Embedding(input_dim=vocab_size,
                                       output_dim=embedding_dim,
                                       input_length=maxlen))
            model.add(layers.Conv1D(128, 5, activation='relu'))
            model.add(layers.GlobalMaxPool1D())
            model.add(layers.Dense(10, activation='relu'))
            model.add(layers.Dense(1, activation='sigmoid'))
            model.compile(optimizer='adam',
                          loss='binary_crossentropy',
                          metrics=['accuracy'])
            model.summary()
            # 训练
            history = model.fit(x_train,
                                y_train,
                                epochs=20,
                                verbose=True,
                                validation_data=(x_test, y_test),
                                batch_size=64)
            loss, accuracy = model.evaluate(x_train, y_train, verbose=False)
            print("Training Accuracy:{:.4f}".format(accuracy))
            loss, accuracy = model.evaluate(x_test, y_test, verbose=False)
            print("Testing Accuracy:{:.4f}".format(accuracy))

            new_final = []
            # new_final.append(" ".join(jieba.cut("北京小学即将开学")))
            new_final.append(" ".join(jieba.cut(title)))
            x_test_final = tokenizer.texts_to_sequences(new_final)
            new_final = pad_sequences(x_test_final, padding='post', maxlen=maxlen)
            print("new final", new_final)
            result = model.predict(new_final)
            if result > 0.5:
                result_type = "谣言"
            else:
                result_type = "事实"
            print("result_type", result_type)
            titleresult = {"title": result_type}
    return render(request,"rumor.html", {"result":titleresult})
