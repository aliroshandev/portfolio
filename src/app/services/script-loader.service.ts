import {DOCUMENT, inject, Injectable, PLATFORM_ID} from '@angular/core';
import {catchError, filter, from, map, Observable, of, shareReplay, switchMap, take} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {

  readonly #document: Document = inject(DOCUMENT);
  readonly #platformId = inject(PLATFORM_ID);
  #loadedScripts = new Map<string, Observable<boolean>>([]);

  loadScript(url: string, target: 'head' | 'body'): Observable<boolean> {
    if (this.#loadedScripts.has(url)) {
      return this.#loadedScripts.get(url)!
    }

    if (this.#document.querySelector(`script[src="${url}"]`)) {
      const loaded$ = of(true);
      this.#loadedScripts.set(url, loaded$);
      return loaded$;
    }

    const load$ = of(isPlatformBrowser(this.#platformId)).pipe(
      take(1),
      filter(Boolean),
      switchMap(() => from(
          new Promise<void>((resolve, reject) => {
            const script = this.#document.createElement('script');
            script.async = true;
            script.src = url;
            script.onload = () => {
              console.log('Script Loaded Successfully')
              resolve();
            };
            script.onerror = () => {
              console.log(`Script Load Error for ${url}`);
              reject();
            };
            this.#document[target].appendChild(script);
          })
        ).pipe(
          map(() => true),
          catchError((err) => {
            this.#loadedScripts.delete(url);
            return of(false);
          })
        )
      ),
      shareReplay({bufferSize: 1, refCount: true}),
    );
    this.#loadedScripts.set(url, load$);
    return load$;
  }

}
