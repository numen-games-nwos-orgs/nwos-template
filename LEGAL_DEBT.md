# LEGAL_DEBT

Registro de deuda legal por C-005 §3/§5. Cada entrada lleva umbral de salida
expresado como condición, no como fecha — salvo donde ninguna salida existe,
que se registra para acotar el alcance. La numeración continúa la del
registro de `numinia-nwos` (LD-001).

## LD-002 · Oferta pública de CC0 sobre el molde (2026-08-17)

**Qué pasó.** Este repositorio estuvo público siendo plantilla, con dos
afirmaciones de CC0-1.0: un `LICENSE` raíz que era una truncación de 768
bytes del texto (solo el *Statement of Purpose*, sin las cláusulas
operativas 1–4, incluida la renuncia) y el pie del `README.md`, que ofrecía
«License: CC0 1.0 Universal» por nombre, con enlace al texto completo.
Misma clase de suceso que LD-001: un CC0 arrastrado, no deliberado.

**El archivo truncado no deshace la oferta.** El `LICENSE` truncado
probablemente no licencia nada por sí mismo, pero la oferta del README
nombra la licencia completa sin ambigüedad mientras la obra estaba
disponible. C-005 §4: pasar un repositorio a público **es** la concesión,
sin necesidad de publicación adicional. Que el texto operativo estuviera
incompleto no convierte la oferta pública en silencio.

**[ABOGADO] Pregunta abierta — no se responde aquí.** ¿Constituye la
oferta pública de «CC0 1.0 Universal» por nombre y enlace, con la obra
disponible, una dedicación efectiva —e irrevocable, §4 posición 5— aunque
el texto del `LICENSE` estuviera truncado? La determinación corresponde a
asesoramiento legal y la registra el Oráculo.

**Qué quedó ofrecido.** Todo el árbol del molde hasta `4371e49` inclusive:
README, plantillas de canon (C-001–C-004), `agents/_template/`,
`protocols/`, `operations/`, `decisions/`, `missions/`, `web/index.html`,
STANDARDS, GOVERNANCE, CONTRIBUTING, CHANGELOG y STATUS. Es andamiaje con
marcadores `{{...}}`, sin lore ni contenido reservado de Numen — el
alcance material es menor que en LD-001, pero la clase del suceso es la
misma.

**Ventana.** Desde que el repositorio pasó a público hasta que el corte de
la rama `audit/c005-licensing` llegue a `main`. El inicio no es
determinable desde git (el historial no registra cambios de visibilidad;
el repo se creó el 2026-04-07): fijarlo requiere el audit log de la
organización en GitHub. **La ventana sigue abierta** — mientras `main`
conserve el `LICENSE` truncado y el pie CC0 del README, la oferta
continúa; esta rama no cierra nada hasta fusionarse.

**Umbral de salida.** Dos condiciones, no fechas:

1. El corte fusionado en `main` — `LICENSE` MIT del molde,
   `LICENSE.client` de reserva a nombre del cliente, pie del README sin
   CC0 — cierra la oferta hacia adelante.
2. Determinación de [ABOGADO] sobre el efecto de la oferta pasada,
   registrada por el Oráculo en esta entrada.

Sobre lo ya ofrecido, si la determinación es que hubo concesión efectiva,
no existe salida: la renuncia es irrevocable por construcción (como
LD-001).

**Consecuencia operativa.** Hasta la determinación, el contenido del molde
publicado durante la ventana se trata como potencialmente CC0. La marca
no: CC0 nunca cedió los identificadores de §7 (`TRADEMARKS.md`). Además,
cada workspace de cliente generado durante la ventana recibió copia del
`LICENSE` truncado y del pie CC0. El contenido del cliente **no** quedó
dedicado por ello — CC0 renuncia a derechos propios y no puede renunciar a
los de otro (§2)—, pero cada uno de esos repositorios afirma hoy sobre sí
mismo un régimen falso, y su corrección corresponde al lado de
`nwos-deploy`, fuera del alcance de este repositorio.
