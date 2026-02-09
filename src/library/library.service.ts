import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { Model } from 'mongoose';
import { Library } from './schemas/library.schema';

@Injectable()
export class LibraryService {
    constructor(
        @InjectModel(Book.name) private bookModel: Model<Book>,
        @InjectModel(Library.name) private libraryModel: Model<Library>
    ) {}

    async createLibrary(): Promise<Library> {

        const book1 = await this.bookModel.create({ 
            title: 'JS Library', 
            author: 'Hamid' 
        });
        const book2 = await this.bookModel.create({
             title: 'HTML Library', 
             author: 'Rafiq' 
            });
        const book3 = await this.bookModel.create({
             title: 'CSS Library', 
             author: 'Manna' 
            });

        const library = new this.libraryModel({
             name: 'Central Library', 
             books: [book1._id, book2._id, book3._id] 
            });
        return library.save();
    }

    async getLibrary(): Promise<Library[]> {
        return this.libraryModel.find().populate('books').exec();
    }
}
