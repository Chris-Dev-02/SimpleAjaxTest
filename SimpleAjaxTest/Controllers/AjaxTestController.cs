using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimpleAjaxTest.Models;

namespace SimpleAjaxTest.Controllers
{
    public class AjaxTestController : Controller
    {
        private ApplicationDbContext _context;
        public AjaxTestController(ApplicationDbContext applicationDb) 
        {
            _context = applicationDb;
        }

        public IActionResult Index()
        {
            var posts = _context.Posts.ToList();
            posts.Reverse();
            if (posts.Count() < 1)
                posts = null;
            return View(posts);
        }

        public IActionResult SearchPostsView()
        {
            return View();
        }

        public IActionResult GetPostsList()
        {
            var posts = _context.Posts.ToList();
            if(posts.Count() < 1) 
                posts = null;
            return View("PostList", posts);
        }

        [HttpGet]
        public IActionResult SearchPosts(string query)
        {
            //query = query.ToLower();
            Console.WriteLine("Query is: " + query);
            List<PostModel>? results = null;
            if (string.IsNullOrEmpty(query))
                return View("_PostList", results);

            results = _context.Posts
                .Where(p => p.Title.ToLower().Contains(query.ToLower()) || p.PublishedBy.ToLower().Contains(query.ToLower()))// || p.Content.Contains(query))
                .ToList();
            return PartialView("_PostList", results);
        }

        [HttpPost]
        public IActionResult PublishPostHTML([FromBody] PostModel post) 
        {
            _context.Posts.Add(post);
            _context.SaveChanges();

            return View("_PostCard", post);
        }

        [HttpPost]
        public IActionResult PublishPost([FromBody] PostModel post)
        {
            _context.Posts.Add(post);
            _context.SaveChanges();

            //return RedirectToAction("Index");
            return Json(new { success = true, message = "Post published!", post});
        }

        [HttpGet]
        public IActionResult EditPost(int id)
        {
            var post = _context.Posts.SingleOrDefault(p => p.Id == id);

            return PartialView("_EditPostForm", post);
        }

        [HttpPost]
        public IActionResult EditPost([FromBody] PostModel post)
        {
            var postToUpdate = _context.Posts.FirstOrDefault(p => p.Id == post.Id);
            Console.WriteLine("Post to update is: " + post.Id);
            if (postToUpdate != null) 
            {
                postToUpdate.Title = post.Title;
                postToUpdate.Content = post.Content;
                _context.SaveChanges();
                return PartialView("_PostCard", postToUpdate);
                //return Json(new { success = true });
            }
            //return Json(new { success = false });
            return PartialView("_EditPostForm", post);
        }

        [HttpGet]
        public IActionResult Details(int id)
        {
            var post = _context.Posts.FirstOrDefault(p => p.Id == id);
            return PartialView("_PostCard", post);
        }

        [HttpPost]
        //[Route("DeletePost/{id:int}")]
        public JsonResult DeletePost(int id) 
        {
            Console.WriteLine("Post to delete is: " + id);
            var posts = _context.Posts.FirstOrDefault(p => p.Id == id);
            if (posts != null) 
            {
                Console.WriteLine("Post found");
                _context.Posts.Remove(posts);
                _context.SaveChanges();
                return Json(new { success = true, message = "Post deleted!" });
            }
            Console.WriteLine("Post not found");
            return Json(new { success = false, message = "Post not found!" });
        }
    }
}
