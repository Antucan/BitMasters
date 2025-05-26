<?php

namespace App\Controller;

use App\Repository\AddressesRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

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
