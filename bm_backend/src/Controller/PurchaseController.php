<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\Purchase;
use App\Repository\ProductRepository;
use App\Repository\PurchaseRepository;
use App\Repository\UsersRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;

#[Route('/purchases')]
final class PurchaseController extends AbstractController
{
    #[Route('/index', name: 'app_purchase', methods: ['GET'])]
    public function index(): Response
    {
        return $this->render('purchase/index.html.twig', [
            'controller_name' => 'PurchaseController',
        ]);
    }

    #[Route('/get/{id}', name: 'app_purchase', methods: ['GET'])]
    public function getByUserId(PurchaseRepository $purchaseRepository, Request $request, UsersRepository $usersRepository, ProductRepository $productRepository, int $id): Response
    {
        // $id = $request->query->get('id');
        $purchases = $purchaseRepository->findByUserId($id);
        $data = array_map(function ($purchase) {
            return [
                'id' => $purchase->getId(),

                'user' => $purchase->getUser() ? [
                    'id' => $purchase->getUser()->getId(),
                    'name' => $purchase->getUser()->getName(),
                    'surname' => $purchase->getUser()->getSurname(),
                    'phone' => $purchase->getUser()->getPhone(),
                    'mail' => $purchase->getUser()->getMail(),
                    'password' => $purchase->getUser()->getPassword(),
                    'role' => $purchase->getUser()->getRole()->getId(),
                ] : null,

                'product' => $purchase->getProduct() ? [
                    'id' => $purchase->getProduct()->getId(),
                    'name' => $purchase->getProduct()->getName(),
                    'description' => $purchase->getProduct()->getDescription(),
                    'category' => $purchase->getProduct()->getCategory(),
                    'user_id' => $purchase->getProduct()->getUser()->getId(),
                    'price' => $purchase->getProduct()->getPrice(),
                    'img_url' => $purchase->getProduct()->getImage(),
                ] : null,

                'quantity' => $purchase->getQuantity(),
                'purchase_date' => $purchase->getPurchaseDate(),
                'status' => $purchase->getStatus()
            ];
        }, $purchases);
        return $this->json($data);
    }
}
