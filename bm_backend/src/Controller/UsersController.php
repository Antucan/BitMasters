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
        //return a json
        $users = $usersRepository->findAll();
        $data = array_map(function ($user) {
            return [
                'id' => $user->getId(),
                'name' => $user->getName(),
                'surname' => $user->getSurname(),
                'phone' => $user->getPhone(),
                'mail' => $user->getMail(),
                'role' => $user->getRole()->getId()
            ];
        }, $users);
        return $this->json($data);
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

        return $this->json([
            'success' => true,
            'user' => [
                'id' => $user->getId(),
                'name' => $user->getName(),
                'surname' => $user->getSurname(),
                'phone' => $user->getPhone(),
                'mail' => $user->getMail(),
                'role' => $user->getRole()->getId()
            ]
        ], Response::HTTP_OK);
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
                'mail' => $user->getMail(),
                'role' => $user->getRole()->getId()
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
                'mail' => $user->getMail(),
                'role' => $user->getRole()->getId()
            ];
        }, $users);

        return $this->json($data);
    }

    #[Route('/new', name: 'app_users_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager, RolesRepository $role): JsonResponse
    {
        $userdata = json_decode($request->getContent(), true);
        $name = $userdata['name'];
        $surname = $userdata['surname'];
        // $phone = $user['phone'];
        $mail = $userdata['mail'];
        $password = $userdata['password'];
        // $name = $request->get("name");
        // $surname = $request->get("surname");
        // $phone = $request->get("phone");
        // $mail = $request->get("mail");
        // $password = $request->get("password");

        if (isset($name) && isset($mail) && isset($password) && isset($surname)) {
            $user = new Users();
            $user->setName($name);
            $user->setSurname($surname);

            if (isset($userdata['phone']))
                $user->setPhone($userdata['phone']);

            $user->setMail($mail);
            $user->setPassword($password);

            $user->setRole($role->findOneByID(2));

            $entityManager->persist($user);
            $entityManager->flush();

            return new JsonResponse(["Ok" => "Usuario creado correctamente"]);
        } else {
            return new JsonResponse(["Error" => "Faltan campos obligatorios, $name"]);
        }
    }

    #[Route('/{id}', name: 'app_users_show', methods: ['GET'])]
    public function show(UsersRepository $usersRepository, Request $request, int $id): Response
{
    if (empty($id)) {
        return $this->json(
            ['error' => 'No id provided'],
            Response::HTTP_BAD_REQUEST
        );
    }

    $users = $usersRepository->findById($id);
        if (empty($users)) {
            return $this->json(
                ['error' => 'No users found with id ' . $id],
                Response::HTTP_NOT_FOUND
            );
        }
        $data = array_map(function ($user) use ($usersRepository) {
            return [
                'id' => $user->getId(),
                'name' => $user->getName(),
                'surname' => $user->getSurname(),
                'phone' => $user->getPhone(),
                'mail' => $user->getMail(),
                'password' => $user->getPassword(),
                'role' => $user->getRole()->getId()
            ];
        }, $users);
        return $this->json($data);
}

    #[Route('/{id}', name: 'app_users_edit', methods: ['PUT'])]
    public function edit(int $id, Request $request, EntityManagerInterface $entityManager, RolesRepository $role): Response
    {
        $user = $entityManager->getRepository(Users::class)->findById($id);

        if (empty($user)) {
            return new JsonResponse(["Error" => "User not found"]);
        }

        $data = json_decode($request->getContent(), true);

        $user->setName($data['name'] ?? $user->getName());
        $user->setSurname($data['surname'] ?? $user->getSurname());
        $user->setPhone($data['phone'] ?? $user->getPhone());
        $user->setMail($data['mail'] ?? $user->getMail());
        $user->setPassword($data['password'] ?? $user->getPassword());
        $user->setRole($role->findOneByID($data['role'] ?? $user->getRole()->getId()));

        $entityManager->flush();

        return new JsonResponse(["Ok" => "Cliente editado correctamente"]);
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
