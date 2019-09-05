import React from 'react'
import styled, { css } from 'astroturf'

const normalize = `
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
`

const Box = styled('main', null, { displayName: 'Application' })`
    ${normalize}
    border: 4px solid lightpink;
    padding: 4%;
`

const NestedElement = styled('div')`
    ${normalize}
    display: flex;
    flex-directon: row;
    align-items: center;
    justify-content: center;
    border: 2px solid lightseagreen;

    ${Box} > & {
        background: lightgoldenrodyellow;
    }
`

const style = css`
    .text {
        background-color: #010101;
        color: #dfdfdf;
        font-size: 24px;

        ${NestedElement}:hover + & {
            cursor: pointer;
            color: lightyellow;
        }
    }
`

export const App = () => (
    <Box>
        <NestedElement>
            <span className={style.text}>I'm nested Element!</span>
        </NestedElement>
    </Box>
)
