<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\Purchase;
use App\Repository\ProductRepository;
use App\Repository\PurchaseRepository;
use App\Repository\UsersRepository;
use DateTime;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;

#[Route('/purchases')]
final class PurchaseController extends AbstractController
{
    #[Route(name: 'app_purchase_index', methods: ['GET'])]
    public function index(): Response
    {
        return $this->render('purchase/index.html.twig', [
            'controller_name' => 'PurchaseController',
        ]);
    }

    #[Route('/get/{id}', name: 'app_purchase_find', methods: ['GET'])]
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

    #[Route('/new', name: 'app_purchase_new', methods: ['POST'])]
    public function addPurchase(Request $request, PurchaseRepository $purchaseRepository, UsersRepository $userRepository, ProductRepository $productRepository, EntityManagerInterface $entityManager): Response
    {
        $purchaseData = json_decode($request->getContent(), true);

        if (!isset($purchaseData["user_id"]) || !isset($purchaseData["product_id"]) || !isset($purchaseData["quantity"]) || !isset($purchaseData["status"])) {
            return new JsonResponse(["Error" => "Faltan campos obligatorios"]);
        }

        $user_id = $purchaseData['user_id'];
        $user = $userRepository->findOneBy(array("id" => $user_id));
        $product_id = $purchaseData['product_id'];
        $product = $productRepository->findOneBy(array("id" => $product_id));
        $quantity = $purchaseData['quantity'];
        $status = $purchaseData['status'];

        $purchase = new Purchase();
        $purchase->setUser($user);
        $purchase->setProduct($product);
        $purchase->setQuantity($quantity);
        $purchase->setPurchaseDate(new DateTime());
        $purchase->setStatus($status);

        if($user === null)
            return new JsonResponse(["Error" => "No se ha encontrado usuario"]);

        if($product === null)
            return new JsonResponse(["Error" => "No se ha encontrado producto"]);

        if($user->getRole()->getId() === 1)
            return new JsonResponse(["Error" => "Usuario no autorizado para la compra"]);

        $entityManager->persist($purchase);
        $entityManager->flush();

        return new JsonResponse(["Ok" => "Compra realizada correctamente"]);
    }
}
