/// <reference types="cypress" />
import { mount } from 'cypress/react'; 
import Quiz from '../../client/src/components/Quiz';

describe('Quiz Component', () => {
  beforeEach(() => {
    // Mount the Quiz component before each test
    mount(<Quiz />);
  });

  it('should display the Start Quiz button initially', () => {
    cy.get('button').contains('Start Quiz').should('be.visible');
  });

  it('should load questions when the quiz starts', () => {
    // Mock the API response
    cy.intercept('GET', '/api/questions/random', {
      fixture: 'questions.json' // Ensure this fixture file exists
    }).as('getQuestions');

    // Click the Start Quiz button
    cy.get('button').contains('Start Quiz').click();

    // Wait for the questions to load
    cy.wait('@getQuestions');

    // Check that the first question is displayed
    cy.get('h2').should('exist'); // You may want to check for specific question text
    cy.contains('What is 2 + 2?').should('be.visible');
  });

  it('should answer a question correctly and move to the next', () => {
    cy.intercept('GET', '/api/questions/random', {
      fixture: 'questions.json'
    }).as('getQuestions');

    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions');

    // Select the first answer (assuming it's correct)
    cy.get('button').first().click();

    // Check that the next question is displayed
    cy.get('h2').should('not.contain', 'First Question Text'); // Replace with actual question text
  });

  it('should complete the quiz and display the score', () => {
    cy.intercept('GET', '/api/questions/random', {
      fixture: 'questions.json'
    }).as('getQuestions');

    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions');

    const numberOfQuestions = 2;

    for (let i = 0; i < numberOfQuestions; i++) {
      cy.get('button').first().click();
  }
    // Check that the quiz completion message is displayed
    cy.get('h2').contains('Quiz Completed').should('be.visible');
    cy.get('.alert.alert-success').should('contain', 'Your score:'); // Check score message
  });
});