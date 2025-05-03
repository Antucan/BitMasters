<?php

namespace App\Repository;

use App\Entity\Product;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Product>
 */
class ProductRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Product::class);
    }

    /**
     * @return Product[] Returns an array of Product objects
     */
    public function findByName(string $name)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.name = :name')
            ->setParameter('name', $name)
            ->getQuery()
            ->getResult();
    }

    public function findByUserId(string $id)
    {
        return $this->createQueryBuilder('p')
               ->andWhere('p.user = :val')
               ->setParameter('val', $id)
               ->orderBy('p.id', 'DESC')
               ->setMaxResults(3)
               ->getQuery()
               ->getResult()
           ;
    }

    // /**
    //  * @return Product[] Returns an array of Product objects
    //  */
    // public function findById(int $id)
    // {
    //     return $this->createQueryBuilder('u')
    //         ->andWhere('u.id = :id')
    //         ->setParameter('id', $id)
    //         ->getQuery()
    //         ->getResult();
    // }
}
