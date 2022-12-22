# Truth Table Generator

## Overview
This is a web application that generates a truth table given a boolean expression with any number of variables.
If you don't want to clone the repository, the project is hosted at this link: https://36nc3.csb.app

To "show work", it creates intermediary columns along the way for how it got the final column. That part was only written because I didn't want to do my homework  in math freshman year of high school. It uses an abstract syntax tree system to analyze the expression in order to find the steps, so it also supports removing duplicate expressions.

Note that there is no error feedback in the programm (which is pretty bad UX). Error messages are logged in the console if you want them.

## Examples

This is the output for the expression: ￢a ∧ b ∨ c

|a|b|c|￢a|￢a ∧ b|(￢a ∧ b) ∨ c|
|-|-|-|-|-|-|
|T|T|T|F|F|T|
|T|T|F|F|F|F|
|T|F|T|F|F|T|
|T|F|F|F|F|F|
|F|T|T|T|T|T|
|F|T|F|T|T|T|
|F|F|T|T|F|T|
|F|F|F|T|F|F|
