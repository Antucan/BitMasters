<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\UsersRepository;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;

#[Route('/productos')]
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
                'price' => $product->getPrice(),
                'img_url' => $product->getImgUrl(),
            ];
        }, $products);
        return $this->json($data);
    }

    #[Route('/id', name: 'app_products_show', methods: ['GET'])]
    public function findById(ProductRepository $productRepository, UsersRepository $usersRepository, Request $request): Response
    {
        $id = $request->query->get('id');
        if (empty($id)) {
            return $this->json(
                ['error' => 'No id provided'],
                Response::HTTP_BAD_REQUEST
            );
        }
        $products = $productRepository->findById($id);
        if (empty($products)) {
            return $this->json(
                ['error' => 'No products found with id ' . $id],
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
                'user' => $product->getUser()->getName(),
                'img_url' => $product->getImgUrl(),
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

    #[Route('/category', name: 'app_products_findByCategory', methods: ['GET'])]
    public function findByCategory(ProductRepository $productRepository, UsersRepository $usersRepository, Request $request): Response
    {
        $category = $request->query->get('category');
        if (empty($category)) {
            return $this->json(
                ['error' => 'No category provided'],
                Response::HTTP_BAD_REQUEST
            );
        }
        $products = $productRepository->findByCategory($category);
        if (empty($products)) {
            return $this->json(
                ['error' => 'No products found with category ' . $category],
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

    #[Route('/new', name: 'app_products_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        //funcion para crear un nuevo producto
        $name = $request->request->get('name');
        $description = $request->request->get('description');
        $category = $request->request->get('category');
        $price = $request->request->get('price');
        //comprobamos si nombre del producto ya existe
        $productRepository = $entityManager->getRepository(Product::class);
        $product = $productRepository->findOneBy(['name' => $name]);
        if (!empty($product)) {
            return $this->json(
                ['error' => 'Product already exists'],
                Response::HTTP_CONFLICT
            );
        }
        if (isset($name) && isset($description) && isset($category) && isset($price)) {
            $product = new Product();
            $product->setName($name);
            $product->setDescription($description);
            $product->setCategory($category);
            $product->setPrice($price);
            $entityManager->persist($product);
            $entityManager->flush();
            return $this->json(
                [
                    'id' => $product->getId(),
                    'name' => $product->getName()
                ],
                Response::HTTP_CREATED
            );
        } else {
            return $this->json(
                ['error' => 'Missing parameters'],
                Response::HTTP_BAD_REQUEST
            );
        }
    }

    #[Route('/update/{id}', name: 'app_products_update', methods: ['PUT'])]
    //funcion para editar un producto
    public function edit($id, Request $request, EntityManagerInterface $entityManager, ProductRepository $productRepository): Response
    {
        $product = $productRepository->find($id);
        if (empty($product)) {
            return $this->json(
                ['error' => 'No product found with id ' . $id],
                Response::HTTP_NOT_FOUND
            );
        }
        $name = $request->request->get('name');
        $description = $request->request->get('description');
        $category = $request->request->get('category');
        $price = $request->request->get('price');

        if (isset($name) && isset($description) && isset($category) && isset($price)) {
            $product->setName($name);
            $product->setDescription($description);
            $product->setCategory($category);
            $product->setPrice($price);
            $entityManager->flush();
            return $this->json(
                [
                    'id' => $product->getId(),
                    'name' => $product->getName()
                ],
                Response::HTTP_OK
            );
        } else {
            return $this->json(
                ['error' => 'No id provided'],
                Response::HTTP_BAD_REQUEST
            );
        }
    }

    #[Route('/delete/{id}', name: 'app_products_delete', methods: ['DELETE'])]
    //funcion para eliminar un producto
    public function delete($id, EntityManagerInterface $entityManager, ProductRepository $productRepository): Response
    {
        $product = $productRepository->find($id);
        if (empty($product)) {
            return $this->json(
                ['error' => 'No product found with id ' . $id],
                Response::HTTP_NOT_FOUND
            );
        }
        $entityManager->remove($product);
        $entityManager->flush();
        return $this->json(
            ['message' => 'Product deleted'],
            Response::HTTP_OK
        );
    }
}
