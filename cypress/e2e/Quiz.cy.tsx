/// <reference types="cypress" />

describe('End-to-End Quiz Component Test', () => {
    beforeEach(() => {
      // Intercept the API call to return the fixture data
      cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('getQuestions');
      cy.visit('http://localhost:3001/'); // Visit the application
    });
  
    it('should start the quiz, answer questions, and complete the quiz', () => {
      // Start the quiz
      cy.get('button').contains('Start Quiz').click();
      cy.wait('@getQuestions'); // Wait for questions to load
  
      // Load the fixture data
      cy.fixture('questions.json').then((questions) => {
        // Answer the first question
        cy.get('h2').should('exist').and('contain', questions[0].question);
        
        // Verify answers are displayed correctly
        questions[0].answers.forEach((answer: { text: string }, index: number) => {
          cy.get('button').contains((index + 1).toString()).should('exist'); // Ensure button 1, 2, 3 exists
          cy.get('.alert.alert-secondary').contains(answer.text).should('exist'); // Ensure answer text is visible
        });
  
        // Click the button for the correct answer (button 2 for "4")
        cy.get('button').contains('2').click(); // Click button 2 which corresponds to "4"
  
        // Verify the second question is displayed
        cy.get('h2').should('not.contain', questions[0].question).and('contain', questions[1].question);
        
        // Verify answers for the second question
        questions[1].answers.forEach((answer: { text: string }, index: number) => {
          cy.get('button').contains((index + 1).toString()).should('exist'); // Ensure button 1, 2, 3 exists
          cy.get('.alert.alert-secondary').contains(answer.text).should('exist'); // Ensure answer text is visible
        });
  
        // Click the button for the correct answer (button 3 for "Paris")
        cy.get('button').contains('3').click(); // Click button 3 which corresponds to "Paris"
  
       
  
        // Verify the completion message
        cy.get('h2').contains('Quiz Completed').should('be.visible');
        cy.get('.alert.alert-success').should('contain', 'Your score:'); // Check score message

        // Click the button to start a new quiz
        cy.get('button').contains('Take New Quiz').click();
      });
    });
  });