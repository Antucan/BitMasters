<?php

namespace App\Controller;

use App\Entity\Addresses;
use App\Repository\UsersRepository;
use App\Repository\AddressesRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/addresses')]
final class AddressesController extends AbstractController
{
    #[Route('/get/{id}', name: 'app_addresses_user_id', methods: ['GET'])]
    public function getByUserId(int $id, AddressesRepository $addressesRepository): JsonResponse
    {
        $addresses = $addressesRepository->findByUserId($id);
        $data = array_map(function ($address) {
            return [
                'id' => $address->getId(),
                'street_type' => $address->getStreetType(),
                'name' => $address->getName(),
                'zip_code' => $address->getZipCode(),
                'city' => $address->getCity(),
            ];
        }, $addresses);

        return $this->json($data);
    }

    #[Route('', name: 'app_addresses_create', methods: ['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $entityManager,
        AddressesRepository $addressesRepository,
        UsersRepository $usersRepository
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['user_id'], $data['street_type'], $data['name'], $data['city'], $data['zip_code'])) {
            return $this->json(['error' => 'Faltan campos obligatorios'], Response::HTTP_BAD_REQUEST);
        }

        $user = $usersRepository->find($data['user_id']);
        if (!$user) {
            return $this->json(['error' => 'Usuario no encontrado'], Response::HTTP_NOT_FOUND);
        }

        $address = new Addresses();
        $address->setStreetType($data['street_type']);
        $address->setName($data['name']);
        $address->setZipCode($data['zip_code']);
        $address->setCity($data['city']);
        $address->setUser($user);

        $entityManager->persist($address);
        $entityManager->flush();

        return $this->json([
            'id' => $address->getId(),
            'street_type' => $address->getStreetType(),
            'name' => $address->getName(),
            'zip_code' => $address->getZipCode(),
            'city' => $address->getCity(),
        ], Response::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'app_addresses_update', methods: ['PUT'])]
    public function update(
        int $id,
        Request $request,
        EntityManagerInterface $entityManager,
        AddressesRepository $addressesRepository
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $address = $addressesRepository->find($id);
        if (!$address) {
            return $this->json(['error' => 'Dirección no encontrada'], Response::HTTP_NOT_FOUND);
        }

        if (!isset($data['street_type'], $data['name'], $data['city'], $data['zip_code'])) {
            return $this->json(['error' => 'Faltan campos obligatorios'], Response::HTTP_BAD_REQUEST);
        }

        $address->setStreetType($data['street_type']);
        $address->setName($data['name']);
        $address->setZipCode($data['zip_code']);
        $address->setCity($data['city']);

        $entityManager->flush();

        return $this->json([
            'id' => $address->getId(),
            'street_type' => $address->getStreetType(),
            'name' => $address->getName(),
            'zip_code' => $address->getZipCode(),
            'city' => $address->getCity(),
        ], Response::HTTP_OK);
    }

    #[Route('/{id}', name: 'app_addresses_delete', methods: ['DELETE'])]
    public function deleteAddress(
        int $id,
        AddressesRepository $addressesRepository,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        $address = $addressesRepository->find($id);

        if (!$address) {
            return $this->json(['error' => 'Dirección no encontrada'], Response::HTTP_NOT_FOUND);
        }

        $entityManager->remove($address);
        $entityManager->flush();

        return $this->json(['message' => 'Dirección eliminada'], Response::HTTP_OK);
    }
}
