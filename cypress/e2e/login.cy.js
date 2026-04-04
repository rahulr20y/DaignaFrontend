describe('Login Flow', () => {
  it('should handle the oauth callback correctly', () => {
    // Mock the oauth_response API call
    cy.intercept('POST', '**/auth/google/', {
      statusCode: 200,
      body: {
        access_token: 'fake-access-token',
        refresh_token: 'fake-refresh-token',
        profile: {
          user: {
            username: 'testuser',
            first_name: 'Test',
            last_name: 'User'
          },
          image: 'https://example.com/image.jpg'
        }
      }
    }).as('googleLogin');

    // Simulate clicking the login button would redirect to Google, 
    // so we skip that and go directly to the callback URL.
    cy.visit('/get-response?state=teststate&code=testcode');

    // Wait for the API call to happen
    cy.wait('@googleLogin');

    // Verify that we are redirected to the app path
    cy.url().should('include', '/app/');
  });
});
