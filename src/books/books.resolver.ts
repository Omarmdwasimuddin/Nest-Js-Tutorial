import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Book } from './model/book.model';
import { BooksService } from './books.service';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Resolver(() => Book)
export class BooksResolver {
    constructor(private readonly booksService: BooksService) {}

    // Define your GraphQL queries and mutations here

    @Query(() => [Book])
    getAllBooks() {
        return this.booksService.findAll();
    }

    @Query(() => Book)
    getBookById(@Args('id')id: string) {
        return this.booksService.findOne(id);
    }

    @Mutation(() => Book)
    createBook(@Args('input') input: CreateBookInput) {
        return this.booksService.create(input);
    }

    @Mutation(() => Book)
    updateBook(@Args('input') input: UpdateBookInput) {
        return this.booksService.update(input);
    }

    @Mutation(() => Book)
    deleteBook(@Args('id') id: string) {
        return this.booksService.remove(id);
    }

}