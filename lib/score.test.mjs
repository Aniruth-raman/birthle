import test from 'node:test'
import assert from 'node:assert/strict'
import { scoreGuess } from './score.ts'

test('exact matches are correct', () => {
  assert.deepEqual(scoreGuess('0101', '0101'), [
    'correct',
    'correct',
    'correct',
    'correct',
  ])
})

test('partial matches are found in any position', () => {
  assert.deepEqual(scoreGuess('0123', '1234'), [
    'wrong',
    'partial',
    'partial',
    'partial',
  ])
})

test('repeated digits cannot match more times than the date contains', () => {
  // The date has two 1s, both already matched exactly by the guess.
  assert.deepEqual(scoreGuess('1111', '0101'), [
    'wrong',
    'correct',
    'wrong',
    'correct',
  ])
})

test('a partial match consumes the digit before a later position can use it', () => {
  // The date has one 1 and two 0s, so the second 1 in the guess is wrong.
  assert.deepEqual(scoreGuess('1100', '0010'), [
    'partial',
    'wrong',
    'partial',
    'correct',
  ])
})
