<?php

namespace App\Controller;

use App\Entity\Users;
use App\Form\UsersType;
use App\Repository\UsersRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

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
    //find user by name 
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

    // find user by mail
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

    #[Route('/new', name: 'app_users_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $user = new Users();
        $form = $this->createForm(UsersType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($user);
            $entityManager->flush();

            return $this->redirectToRoute('app_users_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('users/new.html.twig', [
            'user' => $user,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_users_show', methods: ['GET'])]
    public function show(Users $user): Response
    {
        return $this->render('users/show.html.twig', [
            'user' => $user,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_users_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Users $user, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(UsersType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_users_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('users/edit.html.twig', [
            'user' => $user,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_users_delete', methods: ['POST'])]
    public function delete(Request $request, Users $user, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete' . $user->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($user);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_users_index', [], Response::HTTP_SEE_OTHER);
    }
}
