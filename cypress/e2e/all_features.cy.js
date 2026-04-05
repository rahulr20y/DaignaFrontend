describe('Daigna Features Verification', () => {
  beforeEach(() => {
    // Intercept Google login mock
    cy.intercept('POST', '**/auth/google/', {
      statusCode: 200,
      body: {
        access_token: 'fake-token',
        profile: { username: 'testuser', first_name: 'Test', last_name: 'User' }
      }
    }).as('googleLogin');

    cy.visit('/get-response?state=test&code=testcode');
    cy.wait('@googleLogin');
  });

  it('should allow viewing and adding a Pride entry', () => {
    // Intercept pride fetch - Note the nested structure expected by the app
    cy.intercept('GET', '**/api/pride', {
      statusCode: 200,
      body: [
        {
           pride: { contentid: 'p1', user: { username: 'user1' } },
           body: 'Existing Pride content'
        }
      ]
    }).as('getPride');

    cy.visit('/app/pride');
    cy.wait('@getPride');
    cy.contains('Existing Pride content').should('be.visible');

    // Add new pride
    cy.intercept('POST', '**/api/pride', {
      statusCode: 200,
      body: { 
        status: 200, 
        data: { 
          pride: { contentid: 'p2', user: { username: 'testuser' } }, 
          body: 'I am proud of Daigna!' 
        } 
      }
    }).as('postPride');

    cy.contains('Add a Pride Story').click();
    cy.get('.public-DraftEditor-content').type('I am proud of Daigna!');
    cy.get('button').contains('Post').click({ force: true });
    cy.wait('@postPride');
    cy.contains('I am proud of Daigna!').should('be.visible');
  });

  it('should allow navigating to Family tree and adding a family', () => {
    cy.intercept('GET', '**/api/family', {
      statusCode: 200,
      body: []
    }).as('getFamilies');

    cy.visit('/app/family');
    cy.wait('@getFamilies');
    cy.contains('No Families Found').should('exist');

    // Navigate to create - Target the button text
    cy.get('button').contains('Add a new Family').click({ force: true });
    
    cy.intercept('GET', '**/api/checkname/family*', {
      statusCode: 200,
      body: { data: { available: true } }
    }).as('checkFamily');

    cy.intercept('POST', '**/api/family', {
      statusCode: 200,
      body: { status: 200 }
    }).as('postFamily');

    cy.get('#name').type('Testing Family');
    cy.get('#unique_name').type('testfamily');
    cy.wait('@checkFamily');
    cy.contains('Avaliable').should('be.visible');
    
    cy.get('button').contains('Add Family').click({ force: true });
    cy.wait('@postFamily');
    cy.contains('Family Posted successfully').should('be.visible');
  });

  it('should display notifications', () => {
    cy.intercept('GET', '**/api/notification', {
      statusCode: 200,
      body: [
        {
          notificationid: 'n1',
          content: 'Someone liked your post',
          created_at: new Date().toISOString()
        }
      ]
    }).as('getNotifications');

    cy.visit('/app/notification');
    cy.wait('@getNotifications');
    cy.contains('Someone liked your post').should('be.visible');
  });
});
