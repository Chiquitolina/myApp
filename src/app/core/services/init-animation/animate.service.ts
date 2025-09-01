import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimateService {

  private animatedElements = new Set<string>();

  constructor() { }

  hasAnimated(key: string): boolean {
    return this.animatedElements.has(key);
  }

  setAnimated(key: string): void {
    this.animatedElements.add(key);
  }

}
