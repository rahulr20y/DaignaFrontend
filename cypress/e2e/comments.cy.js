describe('Comment System Flow', () => {
  beforeEach(() => {
    // Intercept Google login
    cy.intercept('POST', '**/auth/google/', {
      statusCode: 200,
      body: {
        access_token: 'fake-token',
        profile: {
          username: 'testuser', first_name: 'Test', last_name: 'User'
        }
      }
    }).as('googleLogin');

    // Simulate login
    cy.visit('/get-response?state=test&code=testcode');
    cy.wait('@googleLogin');
  });

  it('should display comments for a post and allow adding a new one', () => {
    const postid = '123';
    
    // Intercept fetching a single post
    cy.intercept('GET', `**/api/post/${postid}`, {
      statusCode: 200,
      body: {
        post: {
          contentid: postid,
          body: 'Parent post content',
          user: { username: 'parentuser', first_name: 'Parent', last_name: 'User' }
        },
        comments: []
      }
    }).as('getSinglePost');

    // Intercept fetching comments
    cy.intercept('GET', `**/api/comment/${postid}`, {
      statusCode: 200,
      body: [
        {
          commentid: 'c1',
          body: 'First existing comment',
          user: { username: 'otheruser', first_name: 'Other', last_name: 'User' }
        }
      ]
    }).as('getComments');

    // Visit post page
    cy.visit(`/app/post/${postid}`);
    cy.wait('@getSinglePost');
    cy.wait('@getComments');

    // Check if existing comment is visible
    cy.contains('First existing comment').should('be.visible');

    // Add a new comment
    cy.intercept('POST', '**/api/comment', {
      statusCode: 200,
      body: {
        status: 200,
        data: {
          commentid: 'c2',
          body: 'My new test comment',
          user: { username: 'testuser', first_name: 'Test', last_name: 'User' }
        }
      }
    }).as('postComment');

    cy.get('input[placeholder="Type Comment"]').type('My new test comment', { force: true });
    cy.get('button').contains('Send').click({ force: true });
    
    cy.wait('@postComment');
    cy.contains('My new test comment').should('be.visible');
    cy.contains('Comment Posted successfully').should('be.visible');
  });

  it('should allow deleting own comment', () => {
     const postid = '123';
     
     // Mock comments where one is by 'testuser'
     cy.intercept('GET', `**/api/comment/${postid}`, {
      statusCode: 200,
      body: [
        {
          commentid: 'my-c1',
          body: 'Delete me!',
          user: { username: 'testuser', first_name: 'Test', last_name: 'User' }
        }
      ]
    }).as('getComments');

    cy.intercept('GET', `**/api/post/${postid}`, {
      statusCode: 200,
      body: {
        post: { contentid: postid, user: { username: 'foo' } },
        comments: []
      }
    });

    cy.visit(`/app/post/${postid}`);
    cy.wait('@getComments');

    // Open comment options and delete
    cy.intercept('DELETE', '**/api/comment/my-c1', {
      statusCode: 200,
      body: { status: 200 }
    }).as('deleteComment');

    // Find the three dots icon in the comment section
    cy.get('.bi-three-dots-vertical').first().click({ force: true });
    cy.contains('Delete').click({ force: true });

    cy.wait('@deleteComment');
    cy.contains('Comment Deleted successfully').should('be.visible'); // Note: The toast says "Pride Deleted" based on my previous view_file of commentSection.js line 75. 
    // Wait! I found another branding/functional oversight!
    // Line 75 in commentSection.js says "Pride Deleted successfully". 
    // It should say "Comment Deleted".
    cy.contains('Delete me!').should('not.exist');
  });
});
