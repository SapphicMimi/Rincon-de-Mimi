# RinconDeMimi

Este projecto quiere recrear una página web de compra y lectura de Mangas en línea con una Suscripción. Digo recrear, ya que no tiene las funcionalidades de compra ni de envio, pero las recrea. Por lo demás, se puede leer los primeros capitulos de los mangas digitales, si se compran, o si se suscribe a la suscripción de la página, ademas de ver los detalles de de cada manga.

El backend que utiliza es Supabase, por lo que no es necesario abrir ningun backend local.

Lo siguiente, es para tanto abrirlo en local y desarrollar en el, o simplemente verlo, y para más cosas.

Recordar hacer `````npm install`````para instalar todos los paquetes.

Y lo más recomendable para arrancarlo en local es ````ng serve````.

## Supabase-js

Seguramente, supabase-js al descargarse no tenga bien especificadas algunas rutas, haciendo que no encuentre archivos, que en verdad si tiene, por lo que fallará, por lo que vamos a hacer lo siguiente:

1. Primero vamos a node_modules/@supabase/supabase-js/src
2. Vamos a entrar a index.ts y vamos a cambiar lo siguiente y guardamos:

````import SupabaseClient from './SupabaseClient'```` por ````import SupabaseClient from '@supabase/supabase-js/src/SupabaseClient'```` 

3. Por si no se encuentra, es la primera linea, y si hace ng serve, te indicará que línea es.
4. Despues, en el mismo archivo, vamos a cambiar la siguiente línea y guardar:

````export { default as SupabaseClient } from './SupabaseClient'```` por ````export { default as SupabaseClient } from '@supabase/supabase-js/src/SupabaseClient'```` 

5. Casi por último, vamos a ir a SupabaseClient.ts, y vamos a cambiar las siguientes líneas y vamos a guardar:

````
import {
  DEFAULT_GLOBAL_OPTIONS,
  DEFAULT_DB_OPTIONS,
  DEFAULT_AUTH_OPTIONS,
  DEFAULT_REALTIME_OPTIONS,
} from './lib/constants'
import { fetchWithAuth } from './lib/fetch'
import { ensureTrailingSlash, applySettingDefaults } from './lib/helpers'
import { SupabaseAuthClient } from './lib/SupabaseAuthClient'
import { Fetch, GenericSchema, SupabaseClientOptions, SupabaseAuthClientOptions } from './lib/types'`
````

por

````
import {
  DEFAULT_GLOBAL_OPTIONS,
  DEFAULT_DB_OPTIONS,
  DEFAULT_AUTH_OPTIONS,
  DEFAULT_REALTIME_OPTIONS,
} from '@supabase/supabase-js/src/lib/constants'
import { fetchWithAuth } from '@supabase/supabase-js/src/lib/fetch'
import { ensureTrailingSlash, applySettingDefaults } from '@supabase/supabase-js/src/lib/helpers'
import { SupabaseAuthClient } from '@supabase/supabase-js/src/lib/SupabaseAuthClient'
import { Fetch, GenericSchema, SupabaseClientOptions, SupabaseAuthClientOptions } from '@supabase/supabase-js/src/lib/types'`
````

6. Y ya, por ultimo vamos a entrar en /lib y vamos a entrar en el archivo constants.ts, y vamos a cambiar la siguiente línea y guardar:

````import { version } from './version'```` por ````import { version } from '@supabase/supabase-js/src/lib/version'```` 

7. Y ya debería funcionar todo correctamente, y si lanzamos el servidor local con ````ng serve```` podremos ver como se abre correctamente.


## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.


## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.
