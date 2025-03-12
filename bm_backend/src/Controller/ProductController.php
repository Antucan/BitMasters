<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\UsersRepository;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;

#[Route('/products')]
final class ProductController extends AbstractController
{
    #[Route(name: 'app_products_index', methods: ['GET'])]
    public function index(ProductRepository $productRepository): Response
    {
        $products = $productRepository->findAll();
        $data = array_map(function ($product) {
            return [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'category' => $product->getCategory(),
                'price' => $product->getPrice(),
                'user' => $product->getUser()->getName()
            ];
        }, $products);
        return $this->json($data);
    }

    #[Route('/name', name: 'app_products_findByName', methods: ['GET'])]
    public function findByName(ProductRepository $productRepository, UsersRepository $usersRepository, Request $request): Response
    {
        $name = $request->query->get('name');
        if (empty($name)) {
            return $this->json(
                ['error' => 'No name provided'],
                Response::HTTP_BAD_REQUEST
            );
        }
        $products = $productRepository->findByName($name);
        if (empty($products)) {
            return $this->json(
                ['error' => 'No products found with name ' . $name],
                Response::HTTP_NOT_FOUND
            );
        }
        $data = array_map(function ($product) use ($usersRepository) {
            return [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'category' => $product->getCategory(),
                'price' => $product->getPrice(),
                'user' => $product->getUser()->getName()
            ];
        }, $products);
        return $this->json($data);
    }
}
