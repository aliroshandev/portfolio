import {computed, DestroyRef, Directive, ElementRef, inject, input, OnInit} from '@angular/core';
import {LayoutService} from '../services/layout.service';
import {debounceTime, distinctUntilChanged} from 'rxjs';
import {takeUntilDestroyed, toObservable} from '@angular/core/rxjs-interop';

@Directive({
  selector: '[appPickRelatedHeadingOnScrollView]'
})
export class PickRelatedHeadingOnScrollViewDirective
  implements OnInit {

  /**
   * bind as header height, if you don't pass any value it's binds 0 as default.
   */
  appPickRelatedHeadingOnScrollView = input<number>(76);

  readonly #element = inject(ElementRef<HTMLElement>);
  readonly #layoutService = inject(LayoutService);
  readonly #destroyRef = inject(DestroyRef);
  visibleClass = input<string>('visible');
  scrollTopChangeObservable = toObservable(computed(this.#layoutService.scrollY));

  observer!: IntersectionObserver;

  ngOnInit(): void {
    this.#settingVisibleElement();
  }

  #addActiveClass() {
    this.#element.nativeElement.classList.add(this.visibleClass());
  }

  #removeActiveClass() {
    this.#element.nativeElement.classList.remove(this.visibleClass())
  }

  #settingVisibleElement() {
    if (this.#layoutService.isBrowser) {
      this.scrollTopChangeObservable
        .pipe(
          takeUntilDestroyed(this.#destroyRef),
          distinctUntilChanged(),
        )
        .subscribe({
          next: screenSpaceFromTop => {
            const elementSpaceFromTop = this.#element.nativeElement.getBoundingClientRect().top;
            if (elementSpaceFromTop > this.appPickRelatedHeadingOnScrollView()) {
              this.#element.nativeElement.style.scale = Math.min(1 - Math.min((elementSpaceFromTop - screenSpaceFromTop) / elementSpaceFromTop, .8), 1);
              this.#element.nativeElement.style.opacity = Math.min(1 - Math.min((elementSpaceFromTop - screenSpaceFromTop) / elementSpaceFromTop, .8), 1);
              this.#element.nativeElement.style.translate = `${Math.min(Math.abs((screenSpaceFromTop - elementSpaceFromTop)), 0)}px`;
            } else {
              if (elementSpaceFromTop < 0) {
                this.#element.nativeElement.style.opacity = Math.max(Math.abs((screenSpaceFromTop + elementSpaceFromTop)) / screenSpaceFromTop, 0.2);
                this.#element.nativeElement.style.translate = `${100 - Math.min((Math.abs(screenSpaceFromTop + elementSpaceFromTop) / screenSpaceFromTop) * 100, 100)}%`;
                // this.#element.nativeElement.style.scale = Math.max( 1 - Math.abs(screenSpaceFromTop - (screenSpaceFromTop + elementSpaceFromTop)) / (screenSpaceFromTop + elementSpaceFromTop), 0);
              } else {

              }
              // this.#element.nativeElement.style.opacity = Math.max(Math.abs(screenSpaceFromTop + elementSpaceFromTop) / screenSpaceFromTop, 0);
              // this.#element.nativeElement.style.scale = Math.max(Math.abs(screenSpaceFromTop + elementSpaceFromTop) / screenSpaceFromTop, 0);
            }
          }
        })
    }
    // if (this.#layoutService.isBrowser && ('IntersectionObserver' in window)) {
    //   this.observer = new IntersectionObserver(entries => {
    //     entries.forEach(entry => {
    //       if (entry.isIntersecting) {
    //         this.#addActiveClass();
    //       } else {
    //         this.#removeActiveClass();
    //       }
    //     });
    //   });
    //   this.observer.observe(this.#element.nativeElement);
    // }
  }
}
