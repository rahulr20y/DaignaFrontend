describe('Home Page Flow', () => {
  beforeEach(() => {
    // Intercept first to ensure the mock is active
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

    // Simulate login
    cy.visit('/get-response?state=teststate&code=testcode');
    cy.wait('@googleLogin');
    cy.url().should('include', '/app/');
  });

  it('should display the home page with posts and support dark mode', () => {
    // Intercept posts API
    cy.intercept('GET', '**/post/**', {
      statusCode: 200,
      body: {
        status: 200,
        data: [
          {
            post: {
              contentid: '1',
              body: 'Test post content',
              created_at: new Date().toISOString(),
              user: { display_name: 'Test User', username: 'testuser' }
            },
            comments: [],
            isLiked: false
          }
        ]
      }
    }).as('getPosts');

    // Visit home page
    cy.visit('/app/');
    
    // Check if the "What's on your mind?" field is present (my new UI)
    cy.contains("What's on your mind?", { timeout: 10000 }).should('be.visible');

    // Toggle Dark Mode
    cy.get('.bi-moon').should('be.visible').click();
    cy.get('body').should('have.class', 'dark');
    
    // Toggle back to light
    cy.get('.bi-sun').should('be.visible').click();
    cy.get('body').should('not.have.class', 'dark');
  });

  it('should switch languages correctly', () => {
    cy.visit('/app/');
    
    // Switch to Hindi
    cy.get('.bi-globe').parent().click();
    cy.contains('Hindi').click();
    
    // Wait for animation and check translation
    cy.wait(1000);
    cy.contains("आपके मन में क्या है?").should('be.visible');

    // Switch to Bhojpuri
    cy.get('.bi-globe').parent().click();
    cy.contains('Bhojpuri').click();
    
    cy.wait(1000);
    cy.contains("का सोचत बानी?").should('be.visible');
  });
});
