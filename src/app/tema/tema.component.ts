import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AuthService } from '../service/auth.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema:Tema = new Tema()
  listaTemas: Tema[]
  constructor(
    private router: Router,
    private temaService: TemaService,
    private authService:AuthService
  ) { }

  ngOnInit() {
    this.authService.temUser()
    environment.fundo = 'bg-menu-2'
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }
    this.temaService.refreshToken()
    this.mostrarTemas()
  }

  mostrarTemas(){
    this.temaService.getAllTemas().subscribe((resp:Tema[])=>{
      this.listaTemas = resp
    })
  }

  criarTema(){
    this.temaService.cadastrar(this.tema).subscribe((resp:Tema)=>{
      this.tema=resp
      alert('Tema criado com sucesso')
      this.mostrarTemas()
      this.tema = new Tema()
    })
  }
}
