const isAdmin = require('../src/middleware/adminAuth');

describe('Admin Authentication Middleware', () => {
  let mockReq;
  let mockRes;
  let nextFunction;

  beforeEach(() => {
    mockReq = {
      session: {}
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      redirect: jest.fn(),
      render: jest.fn()
    };
    nextFunction = jest.fn();
  });

  it('should redirect to login if no user in session', () => {
    isAdmin(mockReq, mockRes, nextFunction);
    
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.redirect).toHaveBeenCalledWith('/login');
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('should render error page if user is not admin', () => {
    mockReq.session.user = { role: 'user' };
    
    isAdmin(mockReq, mockRes, nextFunction);
    
    expect(mockRes.status).toHaveBeenCalledWith(403);
    expect(mockRes.render).toHaveBeenCalledWith('pages/error', {
      error: {
        status: 403,
        message: 'Åtkomst nekad. Du måste vara admin för att se denna sida.'
      }
    });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('should call next() if user is admin', () => {
    mockReq.session.user = { role: 'admin' };
    
    isAdmin(mockReq, mockRes, nextFunction);
    
    expect(nextFunction).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.redirect).not.toHaveBeenCalled();
    expect(mockRes.render).not.toHaveBeenCalled();
  });
});
