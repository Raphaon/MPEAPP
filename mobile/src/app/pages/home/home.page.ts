import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ApiService, MemberFilter } from '../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe
  ],
  template: `
    <ion-page>
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Brethren Mobile</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content [fullscreen]="true">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Rechercher un membre</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <form [formGroup]="filters">
              <ion-item>
                <ion-label position="stacked">Assemblée</ion-label>
                <ion-input formControlName="assemblyId" placeholder="UUID"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="stacked">District</ion-label>
                <ion-input formControlName="districtId" placeholder="UUID"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="stacked">Région</ion-label>
                <ion-input formControlName="regionId" placeholder="UUID"></ion-input>
              </ion-item>
            </form>
            <ion-button expand="block" (click)="loadMembers()">Actualiser</ion-button>
          </ion-card-content>
        </ion-card>

        <ion-card>
          <ion-card-header>
            <ion-card-title>Résultats</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <ion-item *ngFor="let member of members()">
                <ion-label>
                  <h2>{{ member.lastName }} {{ member.firstName }}</h2>
                  <p>{{ member.assembly?.name }}</p>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>
      </ion-content>
    </ion-page>
  `
})
export class HomePage implements OnInit {
  members = signal<any[]>([]);
  filters = this.fb.group({
    assemblyId: [''],
    districtId: [''],
    regionId: ['']
  });

  constructor(private readonly api: ApiService, private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.loadMembers();
  }

  loadMembers() {
    this.api.getMembers(this.filters.value as MemberFilter).subscribe((response) => {
      this.members.set(response.data);
    });
  }
}
