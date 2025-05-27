<?php

namespace App\Controller;

use App\Repository\AddressesRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Addresses;
use App\Repository\UsersRepository;
use Symfony\Component\HttpFoundation\Request;

#[Route('/addresses')]
final class AddressesController extends AbstractController
{
    #[Route(name: 'app_addresses')]
    public function index(): Response
    {
        return $this->render('addresses/index.html.twig', [
            'controller_name' => 'AddressesController',
        ]);
    }

    #[Route('/get/{id}', name: 'app_addresses_user_id', methods: ["GET"])]
    public function getByUserId(int $id, AddressesRepository $addressesRepository): Response
    {
        $addresses = $addressesRepository->findByUserId($id);
        $data = array_map(function ($address) {
            return [
                'id' => $address->getId(),
                'street_type' => $address->getStreetType(),
                'name' => $address->getName(),
                'zip_code' => $address->getZipCode(),
                'city' => $address->getCity(),

                // 'user' => $address->getUser() ? [
                //     'id' => $address->getUser()->getId(),
                //     'name' => $address->getUser()->getName(),
                //     'surname' => $address->getUser()->getSurname(),
                //     'phone' => $address->getUser()->getPhone(),
                //     'mail' => $address->getUser()->getMail(),
                //     'password' => $address->getUser()->getPassword(),
                //     'role' => $address->getUser()->getRole()->getId(),
                // ] : null,

            ];
        }, $addresses);

        return $this->json($data);
    }

    #[Route('/new', name: 'app_addresses_create', methods: ["POST"])]
    public function createAddress(AddressesRepository $addressesRepository, Request $request, EntityManagerInterface $entityManager, UsersRepository $users): Response
    {
        try {
            $addressData = json_decode($request->getContent(), true);

            $streetType = $addressData["street_type"] ?? null;
            $name = $addressData["name"] ?? null;
            $zipCode = $addressData["zip_code"] ?? null;
            $city = $addressData["city"] ?? null;
            $user_id = $addressData["user_id"] ?? null;

            if (!$name || !$streetType || !$zipCode || !$city) {
                return $this->json(
                    ['error' => 'Missing required parameters'],
                    Response::HTTP_BAD_REQUEST
                );
            }

            $address = new Addresses();
            $address->setStreetType($streetType);
            $address->setName($name);
            $address->setZipCode(intval($zipCode));
            $address->setCity($city);
            $address->setUser($users->find($user_id));

            $entityManager->persist($address);
            $entityManager->flush();

            return $this->json(["Ok" => "Usuario creado correctamente"]);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y devolver un error 500 con el mensaje
            return $this->json(
                ['error' => 'An unexpected error occurred: ' . $e->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    #[Route("/{id}", name: 'app_addresses', methods: ["DELETE"])]
    public function deleteAddress(int $id, AddressesRepository $addressesRepository, EntityManagerInterface $entityManager): Response
    {
        $address = $addressesRepository->find($id);

        if (!$address) {
            return $this->json(
                ["Error" => "User not found"],
                Response::HTTP_NOT_FOUND
            );
        }

        $entityManager->remove($address);
        $entityManager->flush();
        return $this->json(
            ['message' => 'Address deleted'],
            Response::HTTP_OK
        );
    }
}
