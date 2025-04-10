<?php

namespace App\Controller;

use App\Entity\Roles;
use App\Entity\Users;
use App\Form\UsersType;
use App\Repository\RolesRepository;
use App\Repository\UsersRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

#[Route('/users')]
final class UsersController extends AbstractController
{
    #[Route(name: 'app_users_index', methods: ['GET'])]
    public function index(UsersRepository $usersRepository): Response
    {
        return $this->render('users/index.html.twig', [
            'users' => $usersRepository->findAll(),
        ]);
    }

    #[Route('/login', name: 'app_users_login', methods: ['POST'])]
    public function login(UsersRepository $usersRepository, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $mail = $data['mail'] ?? null;
        $password = $data['password'] ?? null;
        
        if (empty($mail) || empty($password)) {
            return $this->json(
                ['error' => 'No mail or password provided'],
                Response::HTTP_BAD_REQUEST
            );
        }

        $user = $usersRepository->findOneByMail($mail);

        if (empty($user)) {
            return $this->json(
                ['error' => 'No user found with mail ' . $mail],
                Response::HTTP_NOT_FOUND
            );
        }

        if ($user->getPassword() !== $password) {
            return $this->json(
                ['error' => 'Invalid password'],
                Response::HTTP_UNAUTHORIZED
            );
        }

        return $this->json(['success' => true], Response::HTTP_OK);
    }

    #[Route('/name', name: 'app_users_findByName', methods: ['GET'])]
    public function findByName(UsersRepository $usersRepository, Request $request): Response
    {
        $name = $request->query->get('name');
        if (empty($name)) {
            return $this->json(
                ['error' => 'No name provided'],
                Response::HTTP_BAD_REQUEST
            );
        }
        $users = $usersRepository->findByName($name);

        if (empty($users)) {
            return $this->json(
                ['error' => 'No users found with name ' . $name],
                Response::HTTP_NOT_FOUND
            );
        }

        $data = array_map(function ($user) {
            return [
                'id' => $user->getId(),
                'name' => $user->getName(),
                'surname' => $user->getSurname(),
                'phone' => $user->getPhone(),
                'mail' => $user->getMail()
            ];
        }, $users);

        return $this->json($data);
    }

    #[Route('/mail', name: 'app_users_findByMail', methods: ['GET'])]
    public function findByMail(UsersRepository $usersRepository, Request $request): Response
    {
        $mail = $request->query->get('mail');
        if (empty($mail)) {
            return $this->json(
                ['error' => 'No mail provided'],
                Response::HTTP_BAD_REQUEST
            );
        }

        if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
            return $this->json(
                ['error' => 'Invalid mail format'],
                Response::HTTP_BAD_REQUEST
            );
        }

        $users = $usersRepository->findByMail($mail);

        if (empty($users)) {
            return $this->json(
                ['error' => 'No users found with mail ' . $mail],
                Response::HTTP_NOT_FOUND
            );
        }

        $data = array_map(function ($user) {
            return [
                'id' => $user->getId(),
                'name' => $user->getName(),
                'surname' => $user->getSurname(),
                'phone' => $user->getPhone(),
                'mail' => $user->getMail()
            ];
        }, $users);

        return $this->json($data);
    }

    #[Route('/new', name: 'app_users_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager, RolesRepository $role): JsonResponse
    {
        $name = $request->request->get("name");
        $surname = $request->request->get("surname");
        $phone = $request->request->get("phone");
        $mail = $request->request->get("mail");
        $password = $request->request->get("password");

        if (isset($name) && isset($surname) && isset($mail) && isset($password)) {
            $user = new Users();
            $user->setName($name);
            $user->setSurname($surname);
            $user->setPhone($phone);
            $user->setMail($mail);
            $user->setPassword($password);

            $user->setRole($role->findOneByID(2));

            $entityManager->persist($user);
            $entityManager->flush();

            return new JsonResponse(["Ok" => "Usuario creado correctamente"]);
        } else {
            return new JsonResponse(["Error" => "Faltan campos obligatorios"]);
        }
    }

    #[Route('/{id}', name: 'app_users_show', methods: ['GET'])]
    public function show(Users $user): Response
    {
        return $this->render('users/show.html.twig', [
            'user' => $user,
        ]);
    }

    #[Route('/{id}', name: 'app_users_edit', methods: ['PUT'])]
    public function edit(int $id, Request $request, EntityManagerInterface $entityManager, RolesRepository $role): Response
    {
        $user = $entityManager->getRepository(Users::class)->findById($id);

        if (empty($user)) {
            return new JsonResponse(["Error" => "User not found"]);
        }

        $name = $request->request->get("name");
        $surname = $request->request->get("surname");
        $phone = $request->request->get("phone");
        $mail = $request->request->get("mail");
        $password = $request->request->get("password");
        $role_id = $request->request->get("role");

        $user->setName($name);
        $user->setSurname($surname);
        $user->setPhone($phone);
        $user->setMail($mail);
        $user->setPassword($password);
        $user->setRole($role->findOneByID($role_id));

        $entityManager->flush();

        return new JsonResponse(["Ok" => "Chingchongers"]);
    }

    #[Route('/{id}/delete', name: 'app_users_delete', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $entityManager): JsonResponse
    {
        $user = $entityManager->getRepository(Users::class)->findById($id);

        if (empty($user)) {
            return new JsonResponse(["Error" => "User not found"]);
        }

        $entityManager->remove($user);
        $entityManager->flush();

        return new JsonResponse(["Ok" => "User deleted succesfully"]);
    }
}
