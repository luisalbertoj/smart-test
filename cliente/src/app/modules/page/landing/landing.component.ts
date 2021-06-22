import { Component, OnInit } from '@angular/core';
import ScrollReveal from 'scrollreveal'
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  public window: any;

  constructor(@Inject(DOCUMENT) private document: Document) { 
    this.window = this.document.defaultView;
  }

  ngOnInit(): void {
    this.plantilla();
  }

  plantilla() {
      const doc = document
      const rootEl = doc.documentElement
      const body = doc.body
      const lightSwitch: any = doc.getElementById('lights-toggle')
      /* global ScrollReveal */
      const sr = ScrollReveal()

      sr.reveal('.feature', {
        duration: 600,
        distance: '20px',
        easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        origin: 'right',
        viewFactor: 0.2
      });

      sr.reveal('.site-header', {
        duration: 600,
        distance: '20px',
        easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        origin: 'right',
        viewFactor: 0.2
      });
    
      rootEl.classList.remove('no-js')
      rootEl.classList.add('js')
    
      this.window.addEventListener('load', function () {
        body.classList.add('is-loaded')
      })
    
      // Reveal animations
      function revealAnimations () {
        sr.reveal('.feature', {
          duration: 600,
          distance: '20px',
          easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          origin: 'right',
          viewFactor: 0.2
        })
      }
    
      if (body.classList.contains('has-animations')) {
        this.window.addEventListener('load', revealAnimations)
      }
    
      // Light switcher
      if (lightSwitch) {
        this.window.addEventListener('load', checkLights)
        lightSwitch.addEventListener('change', checkLights)
      }
    
      function checkLights () {
        let labelText: any = lightSwitch.parentNode.querySelector('.label-text')
        if (lightSwitch.checked) {
          body.classList.remove('lights-off')
          if (labelText) {
            labelText.innerHTML = 'dark'
          }
        } else {
          body.classList.add('lights-off')
          if (labelText) {
            labelText.innerHTML = 'light'
          }
        }
      }   
  }

}
