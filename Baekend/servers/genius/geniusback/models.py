from django.db import models


# Create your models here.
class Members(models.Model):
    nickname = models.CharField(max_length=50)
    email = models.EmailField(max_length=40)
    password = models.CharField(max_length=100)
    profImg = models.URLField(max_length=512, default="https://i.pinimg.com/564x/f3/d1/ed/f3d1edf10d63c40e1fa06364176fa502.jpg")
    seedCnt = models.IntegerField(default=10)
    createDate = models.DateTimeField(auto_now_add=True)
    createCnt = models.IntegerField(default=0)

    class Meta:
        db_table = "member"


class Books(models.Model):
    bookName = models.CharField(max_length=50)
    bCreateDate = models.DateTimeField(auto_now_add=True)
    coverImg = models.URLField(max_length=512, null=True)
    bookShortStory = models.CharField(max_length=512, null=True)
    draft = models.IntegerField(default=0)

    class Meta:
        db_table = "book"


class MyLibrary(models.Model):
    book = models.ForeignKey(Books, on_delete=models.CASCADE)
    user = models.ForeignKey(Members, on_delete=models.CASCADE)

    class Meta:
        db_table = "mylibrary"


class Draft(models.Model):
    user = models.ForeignKey(Members, on_delete=models.CASCADE)
    savedAt = models.DateTimeField(auto_now_add=True)
    diff = models.IntegerField(default=0)
    writer = models.CharField(max_length=30, null=True)
    genre = models.CharField(max_length=30, null=True)

    class Meta:
        db_table = "draft"



class Intro(models.Model):
    draft = models.ForeignKey(Draft, on_delete=models.CASCADE)
    user = models.ForeignKey(Members, on_delete=models.CASCADE)
    introMode = models.BooleanField() # 0 : 알콩이(선택형), 1 : 달콩이(작성형)
    subject = models.CharField(max_length=100)
    IntroContent = models.TextField(null=True)

    class Meta:
        db_table = "intro"


class DraftPage(models.Model):
    draft = models.ForeignKey(Draft, on_delete=models.CASCADE)
    user = models.ForeignKey(Members, on_delete=models.CASCADE)
    pageNum = models.IntegerField()
    pageContent = models.TextField()
    pageImage = models.URLField(max_length=512, null=True)

    class Meta:
        db_table = "draftpage"


class FeedBack(models.Model):
    draft = models.ForeignKey(Draft, on_delete=models.CASCADE)
    user = models.ForeignKey(Members, on_delete=models.CASCADE)
    feedCap = models.CharField(max_length=512)
    feedContent = models.TextField()

    class Meta:
        db_table = "feedback"


class Followers(models.Model):
    user = models.ForeignKey(Members, on_delete=models.CASCADE)
    following = models.IntegerField(default=0) # 내가 버튼 누른거(내가 구독한 사람 수)
    follower = models.IntegerField(default=0) # 구독자 수

    class Meta:
        db_table = "follower"


class Flower(models.Model):
    flowerName = models.CharField(max_length=50) # id - 1: 소중한 꽃 피우기, 2 : 나를 표현하기, 3 : 당신은 출석왕, 4 : 당신은 독서왕, 5 : 알콩이와 친해지기, 6 : 달콩이와 친해지기, 7 : 당신은 인싸, 8 : 당신은 훌륭한 작가


    class Meta:
        db_table = "flower"


class MyForest(models.Model):
    user = models.ForeignKey(Members, on_delete=models.CASCADE)

    #flower = models.ForeignKey(Flower, on_delete=models.CASCADE)

    class Meta:
        db_table = "myforest"


class MyFlower(models.Model):
    user = models.ForeignKey(Members, on_delete=models.CASCADE)
    flower = models.ForeignKey(Flower, on_delete=models.CASCADE)
    getDate = models.DateField()
    isActive = models.BooleanField()

    class Meta:
        db_table = 'myflower'

class TitleImage(models.Model):
    name = models.CharField(max_length=256)
    img_genre = models.CharField(max_length=256)
    title_image_url = models.URLField(max_length=1024)

    class Meta:
        db_table = 'titleimage'
