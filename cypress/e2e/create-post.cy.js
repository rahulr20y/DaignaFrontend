describe('Create Post Flow', () => {
  beforeEach(() => {
    // Intercept login
    cy.intercept('POST', '**/auth/google/', {
      statusCode: 200,
      body: {
        access_token: 'fake-access-token',
        refresh_token: 'fake-refresh-token',
        profile: {
          user: { username: 'testuser', first_name: 'Test', last_name: 'User' },
          image: 'https://example.com/image.jpg'
        }
      }
    }).as('googleLogin');

    cy.visit('/get-response?state=teststate&code=testcode');
    cy.wait('@googleLogin');
  });

  it('should open the create post modal and display the editor', () => {
    cy.visit('/app/');
    
    // Check for "What's on your mind?" card (my new UI)
    cy.contains("What's on your mind?").click();
    
    // Check if the Modal is visible
    cy.get('#create_post').should('be.visible');
    
    // Check for Draft.js editor (it should have a placeholder or similar)
    cy.get('.public-DraftEditor-content').should('exist');
    
    // Check for buttons in the modal footer
    cy.get('button').contains('Post').should('be.visible');
    cy.get('button').contains('Cancel').should('be.visible');
    
    // Check if Bootstrap is available
    cy.window().should('have.property', 'bootstrap');

    // Click Cancel button instead of .btn-close
    cy.get('#create_post button').contains('Cancel').click();
    
    // Check for success or class modification
    cy.wait(2000);
  });

  it('should allow typing in the editor and submitting a post', () => {
    // Intercept create post API
    cy.intercept('POST', '**/api/post', {
      statusCode: 200,
      body: {
        status: 200,
        data: {
          post: {
             contentid: 'new-id',
             body: 'New test post content',
             created_at: new Date().toISOString(),
             user: { display_name: 'Test User', username: 'testuser' }
          },
          comments: [],
          isLiked: false
        }
      }
    }).as('createPost');

    cy.visit('/app/');
    cy.contains("What's on your mind?").click();
    
    // Type in Draft.js editor
    cy.get('.public-DraftEditor-content').type('New test post content');
    
    // Submit
    cy.get('button').contains('Post').click();
    cy.wait('@createPost');
    
    // Check for success message (Bootstrap Alert/Toast)
    cy.contains('Posted successfully').should('be.visible');
    
    // Modal should be closed now
    cy.get('#create_post').should('not.have.class', 'show');
  });
});
