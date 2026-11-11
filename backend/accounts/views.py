from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.serializers import TokenRefreshSerializer


class CustomLoginView(TokenObtainPairView):

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs) 
        #perfrom the original login logic and get the response

        if response.status_code == 200:
            refresh_token = response.data["refresh"]
            response.data['username'] = request.data.get('username')  

            response.set_cookie(
                key="refresh_token",
                value=refresh_token,
                httponly=True,
                secure=False,
                samesite="Lax",
                max_age=86400,
                path="/api/auth/",
            )
            response.data.pop("refresh")
        return response



class CustomRefreshView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")
        print("REFRESH COOKIE:", refresh_token)
        if not refresh_token:
            return Response(
                {"error": "Refresh token not found."},
                status=401
            )

        serializer = TokenRefreshSerializer(
            data={"refresh": refresh_token}
        )

        if serializer.is_valid():
            return Response({
                "access": serializer.validated_data["access"]
            })

        return Response(
            {"error": "Invalid or expired refresh token."},
            status=401
        )
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {
                    "message": "Registration successful.",
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                    },
                },
                status=201,
            )

        return Response(serializer.errors, status=400)


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
        })


class LogoutView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        response = Response(
            {"message": "Logged out successfully."},
            status=status.HTTP_200_OK
        )
        response.delete_cookie(
            key="refresh_token",
            path="/api/auth/",
            samesite="Lax"
        )
        return response
