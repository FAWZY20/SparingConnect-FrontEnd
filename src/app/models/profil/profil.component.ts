import { Component } from '@angular/core';
import { Images } from 'src/app/dataModels/images';
import { Profil } from 'src/app/dataModels/profil';
import { Utilisateur } from 'src/app/dataModels/utilisateur';
import { ImageService } from 'src/app/services/image.service';
import { ProfilService } from 'src/app/services/profil.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  utilisateur: Utilisateur;
  image: Images;
  profil: Profil;
  checkDescription: boolean = false;
  description: string = "";
  urlImage: any;
  imageFile!: File;

  constructor(
    private userService: UserService,
    private profilServie: ProfilService,
    private imageService: ImageService
  ) {
    this.utilisateur = new Utilisateur()
    this.profil = new Profil()
    this.image = new Images()
  }

  descriptionForm() {
    if (this.checkDescription) {
      this.checkDescription = false;
    } else {
      this.checkDescription = true;
    }
  }

  onSubmit() {
    this.utilisateur.description = this.description;
    this.userService.updateUser(this.utilisateur.id, this.utilisateur).subscribe(() => {
      this.checkDescription = false;
    })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.imageFile = file;
    }
  }

  updateImage() {
    this.imageService.updateImage(this.utilisateur.id, this.imageFile).subscribe(() => {
      location.reload()
    })
  }

  ngOnInit() {
    this.userService.decodeToken().subscribe(decodedData => {
      if (decodedData) {
        this.utilisateur = decodedData
        this.profilServie.getProfil(this.utilisateur.id).subscribe((res) => {
          this.profil = res
        })
        this.imageService.getImageProfil(this.utilisateur.id).then(res => {
          this.urlImage = res
        })
      }
    });
  }

}
