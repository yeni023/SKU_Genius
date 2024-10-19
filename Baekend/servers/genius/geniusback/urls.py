from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import (
    BooksViewSet,
    DraftPageViewSet,
    DraftViewSet,
    FeedBackViewSet,
    FlowerViewSet,
    FollowersViewSet,
    GetSeedsCount,
    IntroViewSet,
    LoginViewforAuth,
    MembersViewSet,
    MyFlowerViewSet,
    MyForestViewSet,
    MyLibraryViewSet,
    PurchaseSeeds,
)

router = DefaultRouter()
router.register(r"members", MembersViewSet)
router.register(r"books", BooksViewSet)
router.register(r"mylibrary", MyLibraryViewSet)
router.register(r"draft", DraftViewSet)
router.register(r"intro", IntroViewSet)
router.register(r"draftpage", DraftPageViewSet)
router.register(r"feedback", FeedBackViewSet)
router.register(r"followers", FollowersViewSet)
router.register(r"flower", FlowerViewSet)
router.register(r"myforest", MyForestViewSet)
router.register(r"myflower", MyFlowerViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("login/", LoginViewforAuth.as_view(), name="login"),
    path("purchaseSeeds/", PurchaseSeeds.as_view(), name="purchaseSeeds"),
    path("seedCounts/", GetSeedsCount.as_view(), name="seedCounts"),
]
