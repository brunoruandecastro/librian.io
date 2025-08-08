import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { GoogleBooksGateway, GoogleBooksSearchResponse, GoogleBooksVolume } from './google-books.gateway';

describe('GoogleBooksGateway', () => {
  let gateway: GoogleBooksGateway;
  let httpService: HttpService;

  const mockHttpService = {
    get: jest.fn(),
  };

  const mockSearchResponse: GoogleBooksSearchResponse = {
    kind: 'books#volumes',
    totalItems: 1,
    items: [
      {
        id: 'test-id',
        volumeInfo: {
          title: 'Test Book',
          authors: ['Test Author'],
          publisher: 'Test Publisher',
          publishedDate: '2023',
          description: 'Test description',
          industryIdentifiers: [
            { type: 'ISBN_13', identifier: '9781234567890' },
          ],
          pageCount: 300,
          categories: ['Fiction'],
          averageRating: 4.5,
          ratingsCount: 100,
          imageLinks: {
            thumbnail: 'https://example.com/thumbnail.jpg',
          },
          language: 'en',
          previewLink: 'https://example.com/preview',
          infoLink: 'https://example.com/info',
        },
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoogleBooksGateway,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    gateway = module.get<GoogleBooksGateway>(GoogleBooksGateway);
    httpService = module.get<HttpService>(HttpService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  describe('searchVolumes', () => {
    it('should search volumes successfully', async () => {
      const query = 'harry potter';
      const mockResponse = { data: mockSearchResponse };

      mockHttpService.get.mockReturnValue(of(mockResponse));

      const result = await gateway.searchVolumes(query);

      expect(result).toEqual(mockSearchResponse);
      expect(httpService.get).toHaveBeenCalledWith(
        expect.stringContaining('volumes?q=harry+potter')
      );
    });

    it('should handle errors', async () => {
      const query = 'invalid query';
      const errorMessage = 'Network error';

      mockHttpService.get.mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expect(gateway.searchVolumes(query)).rejects.toThrow(
        `Erro ao buscar volumes: ${errorMessage}`
      );
    });
  });

  describe('getVolumeById', () => {
    it('should get volume by ID successfully', async () => {
      const volumeId = 'test-id';
      const mockVolume: GoogleBooksVolume = mockSearchResponse.items![0];
      const mockResponse = { data: mockVolume };

      mockHttpService.get.mockReturnValue(of(mockResponse));

      const result = await gateway.getVolumeById(volumeId);

      expect(result).toEqual(mockVolume);
      expect(httpService.get).toHaveBeenCalledWith(
        expect.stringContaining(`/volumes/${volumeId}`)
      );
    });
  });

  describe('searchByIsbn', () => {
    it('should search by ISBN', async () => {
      const isbn = '9781234567890';
      mockHttpService.get.mockReturnValue(of({ data: mockSearchResponse }));

      await gateway.searchByIsbn(isbn);

      expect(httpService.get).toHaveBeenCalledWith(
        expect.stringContaining('q=isbn%3A9781234567890')
      );
    });
  });

  describe('searchByTitle', () => {
    it('should search by title', async () => {
      const title = 'Harry Potter';
      mockHttpService.get.mockReturnValue(of({ data: mockSearchResponse }));

      await gateway.searchByTitle(title);

      expect(httpService.get).toHaveBeenCalledWith(
        expect.stringContaining('q=intitle%3AHarry+Potter')
      );
    });
  });

  describe('searchByAuthor', () => {
    it('should search by author', async () => {
      const author = 'J.K. Rowling';
      mockHttpService.get.mockReturnValue(of({ data: mockSearchResponse }));

      await gateway.searchByAuthor(author);

      expect(httpService.get).toHaveBeenCalledWith(
        expect.stringContaining('q=inauthor%3AJ.K.+Rowling')
      );
    });
  });
}); 