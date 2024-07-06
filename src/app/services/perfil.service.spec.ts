import { TestBed } from '@angular/core/testing';

import { PerfilService } from './perfil.service';
import { HttpClientModule } from '@angular/common/http';
import { FirebaseService } from './firebase.service';
import { UserService } from './user.service';

describe('PerfilServiceService', () => {
  let service: PerfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [PerfilService, UserService, FirebaseService]
    });
    service = TestBed.inject(PerfilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
