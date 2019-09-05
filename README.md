# Example of referring components issue for Parcel

In [Astroturf documentatio](https://github.com/4Catalyzer/astroturf#referring-to-other-components) says that we can insert the styled component variable into style declaration of other styled component for referring components between themself. It's amazing feature and it's fine works for webpack and their css-loader. Unfortunately it's not work for Parcel :(

## Astroturf underhood

Astroturf use different ways for processing styles in different bundlers. For webpack it's changed original css-loader with postcss-loader. Astroturf css-loader set configuration, that's all.
It's reasonable, that for Parcel Astroturf use another plugin.

Original code:

```js
const Box = styled('main')`
    border: 4px solid lightpink;
`

const NestedElement = styled('div')`
    border: 2px solid lightseagreen;

    ${Box} > & {
        background: lightgoldenrodyellow;
    }
`

...

const App = () => (
  <Box>
    I'm wrapper
    <NestedElement>
      I'm Nested Element!
    </NestedElement>
  </Box>
)
```

What we have after Astroturf processing:

```css
// Box
.cls1 {
    border: 4px solid lightpink;
}

// NestedElement
@value cls1 as a0 from "App-Box.css";

.cls1 {
    border: 2px solid lightseagreen;

    .a0 > & {
        background: lightgoldenrodyellow;
    }
}
```

After webpack css-loader:

```css
// Box
._1I3PZvwAIyGZa7bFYELb3C {
    border: 4px solid lightpink;
}

// NestedElement
._1e2clFkSkwA0fB4j8zfcVv {
    border: 2px solid lightseagreen;
}
.___CSS_LOADER_IMPORT___1___:focus > ._1e2clFkSkwA0fB4j8zfcVv {
    background: lightgoldenrodyellow;
}
```

After Parcel css-loader:

```css
// Box
._cls1_891fb {
    border: 4px solid lightpink;
}

// NestedElement
._cls1_1d150 {
    border: 2px solid lightseagreen;
}

._a0_1d150 > ._cls1_1d150 {
    background: lightgoldenrodyellow;
}
```
