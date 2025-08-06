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
            if (screenSpaceFromTop > 20) {
              const elementTopSpaceFromTop = (this.#element.nativeElement.firstElementChild! as HTMLElement).getBoundingClientRect().top;
              const elementBottomSpaceFromTop = (this.#element.nativeElement.firstElementChild! as HTMLElement).getBoundingClientRect().bottom;
              // (this.#element.nativeElement.firstElementChild! as HTMLElement).style.translate = '0';
              if (elementTopSpaceFromTop > this.appPickRelatedHeadingOnScrollView()) {
                // this.#element.nativeElement.style.scale = Math.min(1 - Math.min((elementTopSpaceFromTop - screenSpaceFromTop) / elementTopSpaceFromTop, .8), 1);
                (this.#element.nativeElement.firstElementChild! as HTMLElement).style.opacity = Math.min(1 - Math.min((elementTopSpaceFromTop - screenSpaceFromTop) / elementTopSpaceFromTop, .5), 1).toString();
              } else {
                if (elementBottomSpaceFromTop < (2 * this.appPickRelatedHeadingOnScrollView())) {
                  if (elementBottomSpaceFromTop > 0) {
                    // (this.#element.nativeElement.firstElementChild! as HTMLElement).style.translate = `${Math.max((this.appPickRelatedHeadingOnScrollView() - elementBottomSpaceFromTop) / this.appPickRelatedHeadingOnScrollView(), 0) * 100}%`;
                    // (this.#element.nativeElement.firstElementChild! as HTMLElement).style.translate = `${Math.min(((2 * this.appPickRelatedHeadingOnScrollView()) - elementBottomSpaceFromTop)/(2 * this.appPickRelatedHeadingOnScrollView()), 1) * 100}%`;
                    (this.#element.nativeElement.firstElementChild! as HTMLElement).style.opacity = `${Math.max(1 - Math.min(((2 * this.appPickRelatedHeadingOnScrollView()) - elementBottomSpaceFromTop)/(2 * this.appPickRelatedHeadingOnScrollView()), 1), 0.5)}`;
                  } else {
                    // (this.#element.nativeElement.firstElementChild! as HTMLElement).style.translate = `${Math.max(1 - ((this.appPickRelatedHeadingOnScrollView() + elementBottomSpaceFromTop) / this.appPickRelatedHeadingOnScrollView()), 0) * 100}%`;
                  }
                } else {
                  (this.#element.nativeElement.firstElementChild! as HTMLElement).style.translate = '0';
                }
              }
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
