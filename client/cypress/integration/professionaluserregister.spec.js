describe('Test', function() {

    before(function () {
        cy.fixture('professionalUser').then(function(professionalUser){
            this.professionalUser = professionalUser
        })
    })

    it('Professional User Register Test', function() {
        cy.visit('http://localhost:3000/');
        cy.contains('Professionals').should('be.visible');
        cy.findByTestId('professionalUsersButton').click();
        cy.focused();
        cy.contains('SIGN UP').should('exist');
        cy.contains('SIGN UP').click();
        cy.get('input[placeholder="Enter your email"]').type(this.professionalUser.email);
        cy.get('input[placeholder="Insert your name here"]').type(this.professionalUser.name);
        cy.get('input[placeholder="Create your username"]').type(this.professionalUser.username);
        cy.get('input[placeholder="Enter your profession here"]').type(this.professionalUser.profession);
        cy.get('input[placeholder="Enter your password"]').type(this.professionalUser.password);
        cy.get('input[placeholder="Re-enter your password"]').type(this.professionalUser.password);  
        cy.get('button').contains('Register').click();
        // Professional users are redirected to the professionalDashboard
        //cy.contains('Creating a Post');
    });
});