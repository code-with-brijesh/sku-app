from django.test import TestCase
from .models import SKU
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .serializers import SKUSerializer

class SKUModelTest(TestCase):

    def setUp(self):
        self.sku = SKU.objects.create(
            medication_name="Paracetamol",
            dose="500mg",
            presentation="Tablet",
            unit="Box of 20",
            countries="USA, Canada, UK"
        )

    def test_sku_creation(self):
        self.assertIsInstance(self.sku, SKU)
        self.assertEqual(self.sku.medication_name, "Paracetamol")
        self.assertEqual(self.sku.dose, "500mg")
        self.assertEqual(self.sku.presentation, "Tablet")
        self.assertEqual(self.sku.unit, "Box of 20")
        self.assertEqual(self.sku.countries, "USA, Canada, UK")

    def test_sku_str(self):
        self.assertEqual(str(self.sku), "Paracetamol")


class SKUAPITest(APITestCase):

    def setUp(self):
        self.sku = SKU.objects.create(
            medication_name="Paracetamol",
            dose="500mg",
            presentation="Tablet",
            unit="Box of 20",
            countries="USA, Canada, UK"
        )
        self.valid_payload = {
            "medication_name": "Ibuprofen",
            "dose": "200mg",
            "presentation": "Capsule",
            "unit": "Bottle of 30",
            "countries": "France, Germany, Italy"
        }
        self.invalid_payload = {
            "medication_name": "",
            "dose": "200mg",
            "presentation": "Capsule",
            "unit": "Bottle of 30",
            "countries": "France, Germany, Italy"
        }

    def test_get_skus(self):
        response = self.client.get(reverse('sku-list'))
        skus = SKU.objects.all()
        serializer = SKUSerializer(skus, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_valid_sku(self):
        response = self.client.post(
            reverse('sku-list'),
            data=self.valid_payload,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_sku(self):
        response = self.client.post(
            reverse('sku-list'),
            data=self.invalid_payload,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_valid_single_sku(self):
        response = self.client.get(reverse('sku-detail', kwargs={'pk': self.sku.pk}))
        sku = SKU.objects.get(pk=self.sku.pk)
        serializer = SKUSerializer(sku)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_valid_sku(self):
        response = self.client.put(
            reverse('sku-detail', kwargs={'pk': self.sku.pk}),
            data=self.valid_payload,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_sku(self):
        response = self.client.delete(
            reverse('sku-detail', kwargs={'pk': self.sku.pk})
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
